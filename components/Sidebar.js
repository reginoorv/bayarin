function Sidebar({ activePage, onPageChange }) {
    try {
        const menuItems = [
            { icon: 'fa-chart-line', text: 'Beranda', path: 'dashboard' },
            { icon: 'fa-file-invoice', text: 'Tagihan', path: 'invoices' },
            { icon: 'fa-users', text: 'Klien', path: 'clients' },
            { icon: 'fa-wallet', text: 'Pembayaran', path: 'payments' },
            { icon: 'fa-cog', text: 'Pengaturan', path: 'settings' }
        ];

        return (
            <div className="sidebar" data-name="sidebar">
                <nav>
                    {menuItems.map((item, index) => (
                        <a
                            key={index}
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onPageChange(item.path);
                            }}
                            className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg ${
                                activePage === item.path ? 'bg-blue-50 text-blue-600' : ''
                            }`}
                            data-name={`menu-item-${item.text.toLowerCase()}`}
                        >
                            <i className={`fas ${item.icon} w-6`}></i>
                            <span>{item.text}</span>
                        </a>
                    ))}
                </nav>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
