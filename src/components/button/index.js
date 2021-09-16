import React from 'react';
import Loader from "../loader";

const Button = (props) => {
    if (props.secondary || props.primary)
        return <button
            onClick={props.onClick}
            type={props.type}
            className={`
            inline-flex items-center text-sm font-medium shadow-sm  ${props.secondary ? "fontPrimary bg-gray-200" : props.background || "bg-primary text-white"} hover:bg-gray-300 focus:outline-none 
            ${!props.circular ? "px-3 py-2" : ""}
            ${props.rounded ? "rounded" : ""} 
            ${props.circular ? "rounded-full" : ""}
            ${props.className}`}
        >
            {props.iconPosition === "left" ? props.icon : ""}
            {props.circular ? props.icon : ""}
            {props.loading ? <Loader/> : props.children}
            {props.iconPosition === "right" ? props.icon : ""}
        </button>
    return (
        <button
            onClick={props.onClick}
            type={props.type}
            className={`
            inline-flex items-center shadow-sm focus:outline-none 
            ${props.background || "bg-primary"}
            ${props.text || "text-white"}
            ${!props.circular ? "px-3 py-2" : ""}
            ${props.rounded ? "rounded" : ""}
            ${props.circular ? "rounded-full" : ""}
            ${props.className}`}
        >
            {props.iconPosition === "left" ? props.icon : ""}
            {props.loading ? <Loader/> : props.children}

            {props.iconPosition === "right" ? props.icon : ""}
        </button>
    );
};

export default Button;