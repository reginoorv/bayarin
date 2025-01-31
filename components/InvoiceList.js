function InvoiceList({ onCreateClick }) {
    try {
        const [invoices, setInvoices] = React.useState([]);
        const [filterStatus, setFilterStatus] = React.useState('all');

        React.useEffect(() => {
            // Load invoices from storage
            const savedInvoices = getItem('invoices') || [];
            setInvoices(savedInvoices);
        }, []);

        const getStatusText = (status) => {
            switch (status) {
                case 'all': return 'Semua';
                case 'pending': return 'Menunggu';
                case 'paid': return 'Dibayar';
                case 'overdue': return 'Jatuh Tempo';
                default: return status;
            }
        };

        const filteredInvoices = invoices.filter(invoice => 
            filterStatus === 'all' || invoice.status === filterStatus
        );

        return (
            <div className="p-6" data-name="invoice-list">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Daftar Tagihan</h2>
                    <button 
                        className="btn btn-primary" 
                        onClick={onCreateClick}
                        data-name="create-invoice-button"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Buat Tagihan
                    </button>
                </div>

                <div className="mb-6 flex gap-4" data-name="invoice-filters">
                    {['all', 'pending', 'paid', 'overdue'].map(status => (
                        <button
                            key={status}
                            className={`btn ${filterStatus === status ? 'btn-primary' : 'btn-secondary'}`}
                            onClick={() => setFilterStatus(status)}
                            data-name={`filter-${status}`}
                        >
                            {getStatusText(status)}
                        </button>
                    ))}
                </div>

                <div className="grid gap-4" data-name="invoice-grid">
                    {filteredInvoices.length > 0 ? (
                        filteredInvoices.map(invoice => (
                            <div key={invoice.id} className="card flex justify-between items-center" data-name={`invoice-${invoice.id}`}>
                                <div>
                                    <h3 className="font-semibold">{invoice.invoiceNumber}</h3>
                                    <p className="text-gray-500">{invoice.clientName}</p>
                                    <p className="text-sm text-gray-500">Jatuh Tempo: {formatDate(invoice.dueDate)}</p>
                                </div>
                                <div className="text-right">
                                    <p className="font-semibold mb-2">{formatCurrency(invoice.amount)}</p>
                                    <PaymentStatus status={invoice.status} dueDate={invoice.dueDate} />
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-500 py-8">
                            Belum ada tagihan. Klik "Buat Tagihan" untuk membuat tagihan baru.
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
