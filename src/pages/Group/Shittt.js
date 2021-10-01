import MyDropDown from "../../components/PendingPost/MyDropDown"
import { useState } from "react";

export default function Shittt({deletePost}) {
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div>
            <span onClick={toggleMenu} className="ml-c11 cursor-pointer mr-b5 icon-fi-rs-dots text-4px py-c6 px-a1 cursor-pointer"/>
            <MyDropDown
                remove={deletePost}
                className="block"
                open={isMenuOpen}
                onToggle={toggleMenu}
            /> 
        </div>
    )
}
