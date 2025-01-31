function ClientForm({ onSubmit, onCancel, initialData = null }) {
    try {
        const [formData, setFormData] = React.useState(initialData || {
            name: '',
            email: '',
            phone: '',
            address: '',
            company: '',
            notes: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            onSubmit(formData);
        };

        return (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto" data-name="client-form">
                <div className="card">
                    <h2 className="text-xl font-bold mb-6">
                        {initialData ? 'Edit Klien' : 'Tambah Klien Baru'}
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="form-group">
                            <label className="form-label">Nama</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                required
                                data-name="name-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-input"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                required
                                data-name="email-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Telepon</label>
                            <input
                                type="tel"
                                className="form-input"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                data-name="phone-input"
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Perusahaan</label>
                            <input
                                type="text"
                                className="form-input"
                                value={formData.company}
                                onChange={(e) => setFormData({...formData, company: e.target.value})}
                                data-name="company-input"
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Alamat</label>
                        <textarea
                            className="form-input"
                            value={formData.address}
                            onChange={(e) => setFormData({...formData, address: e.target.value})}
                            rows="3"
                            data-name="address-input"
                        ></textarea>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Catatan</label>
                        <textarea
                            className="form-input"
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            rows="3"
                            data-name="notes-input"
                        ></textarea>
                    </div>

                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={onCancel}
                            data-name="cancel-button"
                        >
                            <i className="fas fa-times mr-2"></i>
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            data-name="submit-button"
                        >
                            <i className="fas fa-save mr-2"></i>
                            {initialData ? 'Simpan Perubahan' : 'Tambah Klien'}
                        </button>
                    </div>
                </div>
            </form>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
