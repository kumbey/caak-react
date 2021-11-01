import React, { useState } from "react";
import "./Tooltip.css";
import { useDebounce } from "../../Utility/Util";

const Tooltip = ({ children, content, className, style }) => {
  const [active, setActive] = useState(false);
  const debounced = useDebounce(active, 300);

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
      {debounced && (
        <div
          ref={(el) => {
            if (!el) return null;
            const itemClientRect = el.getBoundingClientRect();
            const windowHeight = window.screen.height;

            if (windowHeight - itemClientRect.bottom < itemClientRect.height) {
              el.style.top = "-10.3rem";
            }
          }}
          className={`Tooltip-Tip ${className && className}`}
          style={style}
        >
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
