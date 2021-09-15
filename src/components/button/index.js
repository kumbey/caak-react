import React from 'react';

const Button = (props) => {
    if (props.secondary)
        return <button
            type="button"
            className={`
            inline-flex items-center text-sm font-medium shadow-sm fontPrimary bg-gray-200 hover:bg-gray-300 focus:outline-none 
            ${props.rounded ? "rounded px-3 py-2" : ""} 
            ${props.circular ? "rounded-full py-0 px-0 p-0" : "px-3 py-2"}
            ${props.className}`}
        >
            {props.iconPosition === "left" ? props.icon : ""}
            {props.children}
            {props.iconPosition === "right" ? props.icon : ""}
        </button>
    return (
        <button
            type="button"
            className={`
            inline-flex items-center text-sm font-medium shadow-sm text-white bg-primary hover:bg-red-400 focus:outline-none 
            ${!props.circular ? "px-3 py-2" : ""}
            ${props.rounded ? "rounded" : ""} 
            ${props.circular ? "rounded-full" : ""}
            ${props.className}`}
        >
            {props.iconPosition === "left" ? props.icon : ""}
            {props.children}
            {props.iconPosition === "right" ? props.icon : ""}
        </button>
    );
};

export default Button;