import GroupInformationDrop from "../../components/PendingPost/GroupInformationDrop"
import { useState } from "react";
import {useClickOutSide} from '../../Utility/Util'

export default function Shittt({deletePost}) {
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const menuRef = useClickOutSide(() => {
        setIsMenuOpen(false);
      });

    return (
        <div ref={menuRef}>
            <span onClick={toggleMenu} className="ml-c11 cursor-pointer mr-b5 icon-fi-rs-dots text-4px py-c6 px-a1 cursor-pointer"/>
            <GroupInformationDrop
                remove={deletePost}
                className="block"
                open={isMenuOpen}
                onToggle={toggleMenu}
            /> 
        </div>
    )
}
