import React from 'react';

const Button = (props) => {
    if (props.secondary)
        return <button
            onClick={props.onClick}
            type="button"
            className={`
            inline-flex items-center text-sm font-medium shadow-sm fontPrimary bg-gray-200 hover:bg-gray-300 focus:outline-none 
            ${!props.circular ? "px-3 py-2" : ""}
            ${props.rounded ? "rounded" : ""} 
            ${props.circular ? "rounded-full" : ""}
            ${props.className}`}
        >
            {props.iconPosition === "left" ? props.icon : ""}
            {props.circular ? props.icon : ""}
            {props.children}
            {props.iconPosition === "right" ? props.icon : ""}
        </button>
    return (
        <button
            onClick={props.onClick}
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