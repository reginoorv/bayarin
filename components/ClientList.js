function ClientList({ onCreateClick }) {
    try {
        const [clients, setClients] = React.useState([]);
        const [searchTerm, setSearchTerm] = React.useState('');

        React.useEffect(() => {
            // Load clients from storage
            const savedClients = getItem('clients') || [];
            setClients(savedClients);
        }, []);

        const filteredClients = clients.filter(client =>
            client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            client.email.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return (
            <div className="p-6" data-name="client-list">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Klien</h2>
                    <button 
                        className="btn btn-primary" 
                        onClick={onCreateClick}
                        data-name="add-client-button"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Tambah Klien
                    </button>
                </div>

                <div className="mb-6" data-name="client-search">
                    <input
                        type="text"
                        placeholder="Cari klien..."
                        className="form-input w-full max-w-md"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="grid gap-4" data-name="client-grid">
                    {filteredClients.length > 0 ? (
                        filteredClients.map(client => (
                            <div key={client.id} className="card flex justify-between items-center" data-name={`client-${client.id}`}>
                                <div>
                                    <h3 className="font-semibold text-lg">{client.name}</h3>
                                    <p className="text-gray-500">{client.email}</p>
                                    {client.company && (
                                        <p className="text-sm text-gray-500">{client.company}</p>
                                    )}
                                </div>
                                <div className="text-right">
                                    <p className="text-sm text-gray-500">Total Tagihan: {client.totalInvoices || 0}</p>
                                    <p className="font-semibold">{formatCurrency(client.totalAmount || 0)}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Belum ada klien. Klik "Tambah Klien" untuk menambahkan klien baru.
                        </div>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
