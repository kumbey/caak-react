import React from 'react';
import Input from "./index";

const SearchInput = (props) => {
    return (
        <div className="w-full">
            <div className="relative">
                <div
                    className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                    </svg>
                    {/*<SearchIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />*/}
                </div>
                <Input {...props} label={"хайлт хийх"} className={"py-2.5 pl-8 pr-3 bg-gray-100 hover:placeholder-fontPrimary"}/>
            </div>
        </div>
    );
};

export default SearchInput;