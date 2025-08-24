import React from 'react';

export default function Input({ type = 'text', className = '', ...props }) {
    return (
        <input
            type={type}
            className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${className}`}
            {...props}
        />
    );
}
