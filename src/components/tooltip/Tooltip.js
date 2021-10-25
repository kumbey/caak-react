import React, { useState } from "react";
import "./Tooltip.css";

const Tooltip = ({ children, content, className }) => {
  const [active, setActive] = useState(false);

  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
    >
      {/* Wrapping */}
      {children}
      {active && (
        <div className={`Tooltip-Tip ${className}`}>
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
