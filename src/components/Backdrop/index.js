const Backdrop = ({children, onClick, className}) => {
    // Log state
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