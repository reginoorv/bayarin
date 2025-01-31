function Settings({ user }) {
    try {
        const [settings, setSettings] = React.useState({
            companyName: 'BayarIN',
            email: 'admin@bayarin.com',
            phone: '',
            address: '',
            taxRate: 11,
            currency: 'IDR',
            emailNotifications: true,
            automaticReminders: true
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            // Save settings - replace with actual API call
            alert('Pengaturan berhasil disimpan');
        };

        return (
            <div className="p-6" data-name="settings-page">
                <h2 className="text-2xl font-bold mb-6">Pengaturan</h2>

                <form onSubmit={handleSubmit} className="max-w-2xl" data-name="settings-form">
                    <div className="card mb-6">
                        <h3 className="text-lg font-semibold mb-4">Informasi Perusahaan</h3>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div className="form-group">
                                <label className="form-label">Nama Perusahaan</label>
                                <input
                                    type="text"
                                    className="form-input"
                                    value={settings.companyName}
                                    onChange={(e) => setSettings({...settings, companyName: e.target.value})}
                                    data-name="company-name-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Email</label>
                                <input
                                    type="email"
                                    className="form-input"
                                    value={settings.email}
                                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                                    data-name="email-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Telepon</label>
                                <input
                                    type="tel"
                                    className="form-input"
                                    value={settings.phone}
                                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                                    data-name="phone-input"
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Tarif Pajak (%)</label>
                                <input
                                    type="number"
                                    className="form-input"
                                    value={settings.taxRate}
                                    onChange={(e) => setSettings({...settings, taxRate: e.target.value})}
                                    data-name="tax-rate-input"
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="form-label">Alamat</label>
                            <textarea
                                className="form-input"
                                value={settings.address}
                                onChange={(e) => setSettings({...settings, address: e.target.value})}
                                rows="3"
                                data-name="address-input"
                            ></textarea>
                        </div>
                    </div>

                    <div className="card mb-6">
                        <h3 className="text-lg font-semibold mb-4">Notifikasi</h3>
                        
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={(e) => setSettings({...settings, emailNotifications: e.target.checked})}
                                    className="mr-2"
                                    data-name="email-notifications-toggle"
                                />
                                <label>Aktifkan notifikasi email</label>
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={settings.automaticReminders}
                                    onChange={(e) => setSettings({...settings, automaticReminders: e.target.checked})}
                                    className="mr-2"
                                    data-name="automatic-reminders-toggle"
                                />
                                <label>Pengingat otomatis untuk tagihan jatuh tempo</label>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="btn btn-primary" data-name="save-settings-button">
                            <i className="fas fa-save mr-2"></i>
                            Simpan Pengaturan
                        </button>
                    </div>
                </form>
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
