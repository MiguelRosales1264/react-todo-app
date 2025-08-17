export default function Chip({ children, className = '' , type = 'category' }) {
    // These are the different types of chips we can have.
    // Each type has differnt styles.
    // Category (Work, Personal, Shopping, etc.)
    // Timeframe (Today, Tomorrow, This Week, This Month, This Year)
    // Priority (Critical, High, Medium, Low)
    // Status (Pending, In Progress, Completed, Rescheduled, Cancelled)
    const baseStyles = {
        category: 'bg-blue-100 text-blue-800',
        timeframe: 'bg-green-100 text-green-800',
        priority: 'bg-yellow-100 text-yellow-800',
        status: 'bg-gray-100 text-gray-800',
    };

    // If the type is not recognized, default to category
    if (!baseStyles[type]) {
        type = 'category';
    }

    // Return the chip component with the appropriate styles
    return (
        <span
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${baseStyles[type]} ${className}`}
        >
            {children}
        </span>
    );
}