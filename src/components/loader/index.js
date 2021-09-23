import React from "react";

const Loader = ({ className }) => {
  return (
    <div className={`spinner`}>
      <div className={`bounce1 ${className}`} />
      <div className={`bounce2 ${className}`} />
      <div className={`bounce3 ${className}`} />
    </div>
  );
};

export default Loader;
