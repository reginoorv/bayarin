function generateInvoiceNumber() {
    try {
        const prefix = 'INV';
        const timestamp = new Date().getTime();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `${prefix}-${timestamp}-${random}`;
    } catch (error) {
        reportError(error);
        return '';
    }
}

function calculateSubtotal(items) {
    try {
        return items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    } catch (error) {
        reportError(error);
        return 0;
    }
}

function calculateTax(subtotal, taxRate = 0.11) {
    try {
        return subtotal * taxRate;
    } catch (error) {
        reportError(error);
        return 0;
    }
}

function calculateTotal(subtotal, tax) {
    try {
        return subtotal + tax;
    } catch (error) {
        reportError(error);
        return 0;
    }
}

function formatCurrency(amount) {
    try {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(amount);
    } catch (error) {
        reportError(error);
        return '';
    }
}
