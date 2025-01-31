function Payments() {
    try {
        const [payments, setPayments] = React.useState([]);
        const [filterStatus, setFilterStatus] = React.useState('all');

        React.useEffect(() => {
            // Mock data - replace with actual API call
            const mockPayments = [
                {
                    id: 1,
                    invoiceNumber: 'INV-001',
                    clientName: 'PT Maju Jaya',
                    amount: 15000000,
                    paymentDate: '2024-01-20',
                    method: 'transfer',
                    status: 'success'
                },
                {
                    id: 2,
                    invoiceNumber: 'INV-002',
                    clientName: 'CV Teknologi Baru',
                    amount: 8000000,
                    paymentDate: '2024-01-15',
                    method: 'ewallet',
                    status: 'pending'
                }
            ];
            setPayments(mockPayments);
        }, []);

        const getMethodIcon = (method) => {
            switch (method) {
                case 'transfer': return 'fa-university';
                case 'ewallet': return 'fa-wallet';
                case 'cash': return 'fa-money-bill';
                default: return 'fa-credit-card';
            }
        };

        const getMethodText = (method) => {
            switch (method) {
                case 'transfer': return 'Transfer Bank';
                case 'ewallet': return 'E-Wallet';
                case 'cash': return 'Tunai';
                default: return method;
            }
        };

        return (
            <div className="p-6" data-name="payments-page">
                <h2 className="text-2xl font-bold mb-6">Pembayaran</h2>

                <div className="mb-6 flex gap-4" data-name="payment-filters">
                    <button
                        className={`btn ${filterStatus === 'all' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilterStatus('all')}
                        data-name="filter-all"
                    >
                        Semua
                    </button>
                    <button
                        className={`btn ${filterStatus === 'success' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilterStatus('success')}
                        data-name="filter-success"
                    >
                        Berhasil
                    </button>
                    <button
                        className={`btn ${filterStatus === 'pending' ? 'btn-primary' : 'btn-secondary'}`}
                        onClick={() => setFilterStatus('pending')}
                        data-name="filter-pending"
                    >
                        Diproses
                    </button>
                </div>

                <div className="grid gap-4" data-name="payments-list">
                    {payments
                        .filter(payment => filterStatus === 'all' || payment.status === filterStatus)
                        .map(payment => (
                            <div key={payment.id} className="card" data-name={`payment-${payment.id}`}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h3 className="font-semibold">{payment.invoiceNumber}</h3>
                                        <p className="text-gray-500">{payment.clientName}</p>
                                        <div className="flex items-center mt-2">
                                            <i className={`fas ${getMethodIcon(payment.method)} mr-2 text-gray-500`}></i>
                                            <span className="text-sm text-gray-500">{getMethodText(payment.method)}</span>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">{formatCurrency(payment.amount)}</p>
                                        <p className="text-sm text-gray-500">{formatDate(payment.paymentDate)}</p>
                                        <PaymentStatus status={payment.status} />
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
