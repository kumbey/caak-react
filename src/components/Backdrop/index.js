import useScrollBlock from "../../Utility/useScrollBlock";
import {useEffect} from "react";

const Backdrop = ({children, onClick, className}) => {
    const [blockScroll, allowScroll] = useScrollBlock();
    useEffect(() => {
        blockScroll();
        return () => allowScroll();
    }, [allowScroll, blockScroll]);
    return (
        <div
            className={`backdrop ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Backdrop;