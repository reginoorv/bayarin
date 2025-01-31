function InvoiceForm({ onSubmit, onCancel }) {
    try {
        const [formData, setFormData] = React.useState({
            clientName: '',
            clientEmail: '',
            items: [{ description: '', quantity: 1, price: 0 }],
            dueDate: '',
            notes: ''
        });

        const handleSubmit = (e) => {
            e.preventDefault();
            const newInvoice = {
                id: Date.now(),
                invoiceNumber: generateInvoiceNumber(),
                ...formData,
                status: 'pending',
                createdAt: new Date().toISOString(),
                amount: calculateTotal(
                    calculateSubtotal(formData.items),
                    calculateTax(calculateSubtotal(formData.items))
                )
            };

            // Get existing invoices
            const existingInvoices = getItem('invoices') || [];
            
            // Add new invoice
            const updatedInvoices = [...existingInvoices, newInvoice];
            
            // Save to storage
            setItem('invoices', updatedInvoices);

            // Call parent handler
            onSubmit(newInvoice);
        };

        const addItem = () => {
            setFormData({
                ...formData,
                items: [...formData.items, { description: '', quantity: 1, price: 0 }]
            });
        };

        return (
            <form onSubmit={handleSubmit} className="invoice-form" data-name="invoice-form">
                <h2 className="text-xl font-bold mb-6">Buat Tagihan Baru</h2>

                <div className="form-group" data-name="client-details">
                    <label className="form-label">Nama Klien</label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.clientName}
                        onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group" data-name="client-email">
                    <label className="form-label">Email Klien</label>
                    <input
                        type="email"
                        className="form-input"
                        value={formData.clientEmail}
                        onChange={(e) => setFormData({...formData, clientEmail: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group" data-name="invoice-items">
                    <label className="form-label">Item</label>
                    {formData.items.map((item, index) => (
                        <div key={index} className="grid grid-cols-3 gap-4 mb-2">
                            <input
                                type="text"
                                placeholder="Deskripsi"
                                className="form-input"
                                value={item.description}
                                onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index].description = e.target.value;
                                    setFormData({...formData, items: newItems});
                                }}
                                required
                            />
                            <input
                                type="number"
                                placeholder="Jumlah"
                                className="form-input"
                                value={item.quantity}
                                onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index].quantity = parseInt(e.target.value) || 0;
                                    setFormData({...formData, items: newItems});
                                }}
                                required
                                min="1"
                            />
                            <input
                                type="number"
                                placeholder="Harga"
                                className="form-input"
                                value={item.price}
                                onChange={(e) => {
                                    const newItems = [...formData.items];
                                    newItems[index].price = parseFloat(e.target.value) || 0;
                                    setFormData({...formData, items: newItems});
                                }}
                                required
                                min="0"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-secondary mt-2"
                        onClick={addItem}
                        data-name="add-item-button"
                    >
                        <i className="fas fa-plus mr-2"></i>
                        Tambah Item
                    </button>
                </div>

                <div className="form-group" data-name="due-date">
                    <label className="form-label">Tanggal Jatuh Tempo</label>
                    <input
                        type="date"
                        className="form-input"
                        value={formData.dueDate}
                        onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
                        required
                    />
                </div>

                <div className="form-group" data-name="notes">
                    <label className="form-label">Catatan</label>
                    <textarea
                        className="form-input"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        rows="3"
                    ></textarea>
                </div>

                <div className="flex justify-end gap-4" data-name="form-actions">
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        <i className="fas fa-times mr-2"></i>
                        Batal
                    </button>
                    <button type="submit" className="btn btn-primary">
                        <i className="fas fa-save mr-2"></i>
                        Buat Tagihan
                    </button>
                </div>
            </form>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
