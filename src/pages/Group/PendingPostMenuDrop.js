import {useClickOutSide} from '../../Utility/Util'

export default function PendingPostMenuDrop({containerClassName, setIsMenuOpen, toggleMenu, children}) {


    const menuRef = useClickOutSide(() => {
        setIsMenuOpen(false);
    });

    return (
        <div className={`${containerClassName}`} ref={menuRef}>
            <span onClick={toggleMenu}
                  className="ml-c11 cursor-pointer mr-b5 icon-fi-rs-dots text-4px py-c6 px-a1 cursor-pointer"/>
            {children}
        </div>
    )
}
