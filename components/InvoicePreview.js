function InvoicePreview({ invoice }) {
    try {
        if (!invoice) return null;

        const subtotal = calculateSubtotal(invoice.items);
        const tax = calculateTax(subtotal);
        const total = calculateTotal(subtotal, tax);

        return (
            <div className="invoice-preview" data-name="invoice-preview">
                <div className="invoice-header">
                    <div data-name="company-info">
                        <h1 className="text-2xl font-bold text-blue-600">BayarIN</h1>
                        <p className="text-gray-500">Invoice Management System</p>
                    </div>
                    <div className="text-right" data-name="invoice-info">
                        <h2 className="text-xl font-semibold">INVOICE</h2>
                        <p className="text-gray-500">{invoice.invoiceNumber}</p>
                        <p className="text-gray-500">Date: {formatDate(new Date())}</p>
                        <p className="text-gray-500">Due Date: {formatDate(invoice.dueDate)}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8" data-name="client-details">
                    <div>
                        <h3 className="font-semibold mb-2">Bill To:</h3>
                        <p className="font-medium">{invoice.clientName}</p>
                        <p className="text-gray-500">{invoice.clientEmail}</p>
                    </div>
                </div>

                <table className="w-full mb-8" data-name="invoice-items">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Description</th>
                            <th className="text-right py-2">Quantity</th>
                            <th className="text-right py-2">Price</th>
                            <th className="text-right py-2">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {invoice.items.map((item, index) => (
                            <tr key={index} className="border-b">
                                <td className="py-2">{item.description}</td>
                                <td className="text-right py-2">{item.quantity}</td>
                                <td className="text-right py-2">{formatCurrency(item.price)}</td>
                                <td className="text-right py-2">{formatCurrency(item.quantity * item.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="flex justify-end" data-name="invoice-summary">
                    <div className="w-64">
                        <div className="flex justify-between mb-2">
                            <span>Subtotal:</span>
                            <span>{formatCurrency(subtotal)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span>Tax (11%):</span>
                            <span>{formatCurrency(tax)}</span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total:</span>
                            <span>{formatCurrency(total)}</span>
                        </div>
                    </div>
                </div>

                {invoice.notes && (
                    <div className="mt-8" data-name="invoice-notes">
                        <h3 className="font-semibold mb-2">Notes:</h3>
                        <p className="text-gray-600">{invoice.notes}</p>
                    </div>
                )}
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
