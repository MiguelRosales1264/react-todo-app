export default function Button({
    onClick,
    children,
    className = '',
    ariaLabel = '',
    variant = 'primary',
    size = 'medium',
    type = 'button',
}) {
    const baseStyles =
        'cursor-pointer inline-flex items-center justify-center transition-all duration-200 focus:outline-none';

    const variants = {
        primary:
            'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 rounded-md',
        secondary:
            'bg-gray-100 text-gray-700 hover:bg-gray-200 active:bg-gray-300 rounded-md',
        outline:
            'border border-gray-300 text-gray-700 hover:bg-gray-50 active:bg-gray-100 rounded-md',
        danger: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 rounded-md',
        icon: 'text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-full',
        'icon-primary':
            'text-blue-500 hover:bg-blue-50 active:bg-blue-100 rounded-full',
        ghost: 'text-gray-600 hover:bg-gray-100 active:bg-gray-200 rounded-md',
    };

    const sizes = {
        small: variant.includes('icon') ? 'p-1.5' : 'px-3 py-1.5 text-sm',
        medium: variant.includes('icon') ? 'p-2' : 'px-4 py-2',
        large: variant.includes('icon') ? 'p-3' : 'px-6 py-3 text-lg',
    };

    return (
        <button
            type={type}
            onClick={onClick}
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}
