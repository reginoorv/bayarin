function PaymentStatus({ status, dueDate }) {
    try {
        const getStatusColor = () => {
            switch (status.toLowerCase()) {
                case 'paid':
                    return 'bg-green-100 text-green-800';
                case 'pending':
                    return 'bg-yellow-100 text-yellow-800';
                case 'overdue':
                    return 'bg-red-100 text-red-800';
                default:
                    return 'bg-gray-100 text-gray-800';
            }
        };

        const getStatusIcon = () => {
            switch (status.toLowerCase()) {
                case 'paid':
                    return 'fa-check-circle';
                case 'pending':
                    return 'fa-clock';
                case 'overdue':
                    return 'fa-exclamation-circle';
                default:
                    return 'fa-question-circle';
            }
        };

        const getStatusText = (status) => {
            switch (status.toLowerCase()) {
                case 'paid':
                    return 'Dibayar';
                case 'pending':
                    return 'Menunggu';
                case 'overdue':
                    return 'Jatuh Tempo';
                default:
                    return status;
            }
        };

        return (
            <div className={`inline-flex items-center px-3 py-1 rounded-full ${getStatusColor()}`} data-name="payment-status">
                <i className={`fas ${getStatusIcon()} mr-2`}></i>
                <span className="font-medium">{getStatusText(status)}</span>
                {dueDate && status.toLowerCase() !== 'paid' && (
                    <span className="ml-2 text-sm">
                        {isOverdue(dueDate) ? 
                            `Terlambat ${getDaysDifference(dueDate, new Date())} hari` : 
                            `${getDaysDifference(new Date(), dueDate)} hari lagi`}
                    </span>
                )}
            </div>
        );
    } catch (error) {
        reportError(error);
        return null;
    }
}
