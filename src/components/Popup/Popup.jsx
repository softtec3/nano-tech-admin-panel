import React, { useState } from "react";
import "./popup.css";
import { FaXmark } from "react-icons/fa6";
const Popup = ({ children, isOpen, setIsOpen, width, height }) => {
  return (
    // popup reuseable component
    <div
      className="popupOverlay"
      style={{ display: `${isOpen ? "block" : "none"}` }}
    >
      <div id="popup" style={{ width: `${width}`, height: `${height}` }}>
        {/* close popup button */}
        <div style={{ textAlign: "right" }}>
          <FaXmark
            onClick={() => setIsOpen(false)}
            style={{ cursor: "pointer" }}
            size={20}
          />
        </div>
        {/* close popup button */}
        <div>{children}</div>
      </div>
    </div>
    // popup reuseable component
  );
};

export default Popup;
