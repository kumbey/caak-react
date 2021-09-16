import React from 'react';

const Select = (props) => {
    return (
        <div className={props.containerStyle}>
            <label htmlFor={props.id} className={`block  ${props.labelStyle}`}>
                {props.label}
            </label>
            <select
                id={props.id}
                name={props.name}
                className={`mt-1 w-full pl-3 pr-10 py-3 block w-full rounded-md text-base border border-gray-200 placeholder-gray-400
                    focus:outline-none focus:text-gray-900 focus:placeholder-gray-500 hover:placeholder-fontPrimary
                    focus:ring-1 focus:ring-primary focus:border-primary sm:text-sm hover:border-primary
                    hover:bg-white transition ease-in duration-100 ${props.className}`}
                defaultValue={props.defaultValue}
            >
                {props.children}
            </select>
        </div>
    );
};

export default Select;