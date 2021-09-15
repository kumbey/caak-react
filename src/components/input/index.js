import React from 'react';

const Input = (props) => {
    return (
        <div>
            <label htmlFor="email" className={props.labelStyle}>
                {props.label}
            </label>
            <input
                id="email"
                name="email"
                className={`block w-full border border-transparent rounded-md text-base placeholder-gray-400 
                focus:outline-none focus:text-gray-900 focus:placeholder-gray-500 hover:placeholder-fontPrimary 
                focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm hover:border-primary 
                hover:bg-white transition ease-in duration-200 ${props.className}`}
                placeholder={props.placeholder}
                type="text"
            />
        </div>
    );
};

export default Input;