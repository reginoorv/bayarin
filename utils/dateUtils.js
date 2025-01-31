function formatDate(date) {
    try {
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        reportError(error);
        return '';
    }
}

function calculateDueDate(days) {
    try {
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date.toISOString().split('T')[0];
    } catch (error) {
        reportError(error);
        return '';
    }
}

function isOverdue(dueDate) {
    try {
        return new Date(dueDate) < new Date();
    } catch (error) {
        reportError(error);
        return false;
    }
}

function getDaysDifference(date1, date2) {
    try {
        const diffTime = Math.abs(new Date(date2) - new Date(date1));
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    } catch (error) {
        reportError(error);
        return 0;
    }
}
