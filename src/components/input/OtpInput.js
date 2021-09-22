import React, { useState } from "react";

export default function Test  ()  {
    const [otp, setOtp] = useState(new Array(6).fill(""))

    const handleChange= (element,  index) => {
        if(isNaN(element.value)) 
        return false;

        setOtp([...otp.map((d, idx)=> (idx === index) ? element.value : d)]);

        if(element.nextSibling){
            element.nextSibling.focus();
        }
    }
    return(
        <div className="flex justify-between mx-c13">
            {
                otp.map((data, index) => {
                    return(
                        <input
                        
                            value={data}
                            key={index}
                            onChange={e => handleChange(e.target, index)}
                            onFocus={e => e.target.select({})}
                            id="neg" 
                            type="regexPassword" 
                            maxLength="1" 
                            className="w-c15 h-c20 text-28px text-caak-generalblack text-center bg-caak-liquidnitrogen border border-caak-titaniumwhite rounded-lg"
                        />
                    )
                })
            }
        </div>
    )
}