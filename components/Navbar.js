function Navbar({ user }) {
    try {
        return (
            <nav className="bg-white shadow-sm" data-name="navbar">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <span className="logo" data-name="logo">BayarIN</span>
                        </div>
                        <div className="flex items-center">
                            <div className="ml-3 relative" data-name="user-menu">
                                <div className="flex items-center">
                                    <i className="fas fa-user-circle text-2xl text-gray-400 mr-2"></i>
                                    <span className="text-gray-700">{user?.name || 'Guest'}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
