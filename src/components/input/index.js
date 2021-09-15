import React from 'react';

const Input = ({labelStyle, hideLabel, label, className, errorMessage, ...props}) => {
    return (
        <div>
            {hideLabel ? null : <label htmlFor={props.id} className={`${labelStyle}`}>
                {label}
            </label>}
            <input
                {...props}
                className={`block pl-3 pr-3 w-full rounded-md text-base border border-gray-200 placeholder-gray-400 
                focus:outline-none focus:text-gray-900 focus:placeholder-gray-500 hover:placeholder-fontPrimary 
                focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm hover:border-primary 
                hover:bg-white transition ease-in duration-100 " ${className}`}
            />
            <p className="mt-2 text-sm text-red-600 text-right" id="email-error">
                {errorMessage}
            </p>
        </div>
    );
};

export default Input;