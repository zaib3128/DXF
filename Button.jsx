import React from 'react';

const Button = ({ children, primary = false, onClick, className = '', ...props }) => (
  <button
    onClick={onClick}
    {...props}
    className={`px-4 py-2 rounded-lg font-medium transition duration-150 ease-in-out ${
      primary
        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
    } ${className}`}
  >
    {children}
  </button>
);

export default Button;
