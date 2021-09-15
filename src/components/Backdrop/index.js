const Backdrop = ({children, onClick}) => {
    // Log state
    return (
        <div
            className="backdrop"
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Backdrop;