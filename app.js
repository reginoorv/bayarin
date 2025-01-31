function App() {
    try {
        const [currentPage, setCurrentPage] = React.useState('dashboard');
        const [user, setUser] = React.useState(null);
        const [showClientForm, setShowClientForm] = React.useState(false);

        const handleLogin = (userData) => {
            setUser(userData);
            setCurrentPage('dashboard');
        };

        const handleLogout = () => {
            setUser(null);
            setCurrentPage('login');
        };

        const handlePageChange = (page) => {
            setCurrentPage(page);
            setShowClientForm(false);
        };

        const handleCreateInvoice = (invoiceData) => {
            try {
                // Invoice is already saved in InvoiceForm
                setCurrentPage('invoices');
            } catch (error) {
                reportError(error);
            }
        };

        const handleCreateClient = (clientData) => {
            try {
                const newClient = {
                    id: Date.now(),
                    ...clientData,
                    createdAt: new Date().toISOString(),
                    totalInvoices: 0,
                    totalAmount: 0
                };

                // Get existing clients
                const existingClients = getItem('clients') || [];
                
                // Add new client
                const updatedClients = [...existingClients, newClient];
                
                // Save to storage
                setItem('clients', updatedClients);

                setShowClientForm(false);
                setCurrentPage('clients');
            } catch (error) {
                reportError(error);
            }
        };

        const renderContent = () => {
            if (!user) {
                return <Login onLogin={handleLogin} />;
            }

            switch (currentPage) {
                case 'dashboard':
                    return <Dashboard />;
                case 'invoices':
                    return <InvoiceList onCreateClick={() => setCurrentPage('create-invoice')} />;
                case 'create-invoice':
                    return <InvoiceForm onSubmit={handleCreateInvoice} onCancel={() => setCurrentPage('invoices')} />;
                case 'clients':
                    return showClientForm ? 
                        <ClientForm onSubmit={handleCreateClient} onCancel={() => setShowClientForm(false)} /> :
                        <ClientList onCreateClick={() => setShowClientForm(true)} />;
                case 'payments':
                    return <Payments />;
                case 'settings':
                    return <Settings user={user} />;
                default:
                    return <Dashboard />;
            }
        };

        return (
            <div data-name="app-container">
                {user && <Navbar user={user} onLogout={handleLogout} />}
                {user ? (
                    <div className="dashboard-container">
                        <Sidebar activePage={currentPage} onPageChange={handlePageChange} />
                        <main className="main-content">
                            {renderContent()}
                        </main>
                    </div>
                ) : (
                    renderContent()
                )}
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
