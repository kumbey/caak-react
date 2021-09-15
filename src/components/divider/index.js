import React from 'react';

const Divider = (props) => {
    return (
        <div className={`relative ${props.className}`}>
            <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className={`w-full border-t ${props.color}`}/>
            </div>
            <div className="relative flex justify-center">
                <span className={`px-2 bg-white ${props.textSize} ${props.textColor}`}>{props.text}</span>
            </div>
        </div>
    );
};

export default Divider;