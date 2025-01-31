function Dashboard() {
    try {
        const stats = [
            { title: 'Total Tagihan', value: '0', icon: 'fa-file-invoice' },
            { title: 'Menunggu Pembayaran', value: 'Rp 0', icon: 'fa-clock' },
            { title: 'Sudah Dibayar', value: 'Rp 0', icon: 'fa-check-circle' },
            { title: 'Jatuh Tempo', value: 'Rp 0', icon: 'fa-exclamation-circle' }
        ];

        return (
            <div className="p-6" data-name="dashboard">
                <h1 className="text-2xl font-bold mb-6">Beranda</h1>
                
                <div className="stats-grid">
                    {stats.map((stat, index) => (
                        <div key={index} className="stat-card" data-name={`stat-${stat.title.toLowerCase().replace(' ', '-')}`}>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-gray-500">{stat.title}</p>
                                    <p className="stat-value">{stat.value}</p>
                                </div>
                                <i className={`fas ${stat.icon} text-3xl text-blue-500`}></i>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="card" data-name="recent-invoices">
                        <h2 className="text-lg font-semibold mb-4">Tagihan Terbaru</h2>
                        <p className="text-gray-500">Belum ada tagihan</p>
                    </div>
                    
                    <div className="card" data-name="payment-activity">
                        <h2 className="text-lg font-semibold mb-4">Aktivitas Pembayaran</h2>
                        <p className="text-gray-500">Belum ada aktivitas pembayaran</p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
