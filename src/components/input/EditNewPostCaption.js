import React from 'react';
import Divider from "../divider";

const EditNewPostCaption = () => {
    return (
        <div>
            <div className={"relative header mb-3"}>
            <span
                className={
                    "icon-fi-rs-close absolute text-12px right-3 top-1/4 cursor-pointer bg-caak-titaniumwhite p-2 rounded-full"
                }
            />
                <div
                    className={
                        "text-22px text-center text-caak-generalblack font-bold p-4.5 leading-7"
                    }
                >
                    Нийтлэл нэмэх
                </div>
                <Divider />
            </div>
        </div>
    );
};

export default EditNewPostCaption;