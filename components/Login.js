function Login({ onLogin }) {
    try {
        const [credentials, setCredentials] = React.useState({
            email: '',
            password: ''
        });
        const [error, setError] = React.useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            // Mock authentication - replace with actual API call
            if (credentials.email === 'admin@bayarin.com' && credentials.password === 'admin123') {
                onLogin({
                    id: 1,
                    name: 'Admin BayarIN',
                    email: credentials.email,
                    role: 'admin'
                });
            } else {
                setError('Email atau password salah');
            }
        };

        const fillDemoAccount = () => {
            setCredentials({
                email: 'admin@bayarin.com',
                password: 'admin123'
            });
        };

        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100" data-name="login-page">
                <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-blue-600">BayarIN</h1>
                        <p className="text-gray-600 mt-2">Sistem Manajemen Tagihan</p>
                    </div>

                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" data-name="error-message">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} data-name="login-form">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                className="form-input w-full"
                                value={credentials.email}
                                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                                required
                                data-name="email-input"
                            />
                        </div>

                        <div className="mb-6">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-input w-full"
                                value={credentials.password}
                                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                                required
                                data-name="password-input"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full btn btn-primary mb-4"
                            data-name="login-button"
                        >
                            <i className="fas fa-sign-in-alt mr-2"></i>
                            Masuk
                        </button>
                    </form>

                    <div className="border-t pt-4" data-name="demo-account">
                        <p className="text-center text-gray-600 mb-2">Akun Demo</p>
                        <div className="bg-gray-50 p-4 rounded">
                            <div className="flex justify-between mb-2">
                                <span className="text-gray-600">Email:</span>
                                <span className="text-gray-800 font-medium">admin@bayarin.com</span>
                            </div>
                            <div className="flex justify-between mb-4">
                                <span className="text-gray-600">Password:</span>
                                <span className="text-gray-800 font-medium">admin123</span>
                            </div>
                            <button
                                type="button"
                                onClick={fillDemoAccount}
                                className="w-full btn btn-secondary"
                                data-name="fill-demo-button"
                            >
                                <i className="fas fa-user-circle mr-2"></i>
                                Gunakan Akun Demo
                            </button>
                        </div>
                        <p className="text-center text-gray-500 text-sm mt-4">
                            *Akun demo hanya untuk tujuan testing
                        </p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
