import React from 'react';

const Button = (props) => {
    const {type} = props
    if (type === "primary")
        return (
            <button
                type="button"
                className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded shadow-sm text-white bg-primary hover:bg-red-400 focus:outline-none ${props.className}`}
            >
                {props.children}
            </button>
        );
    return <button
        type="button"
        className={`inline-flex items-center px-3 py-2 text-sm font-medium rounded shadow-sm fontPrimary bg-gray-200 hover:bg-gray-300 focus:outline-none ${props.className}`}
    >
        {props.children}
    </button>
};

export default Button;