import React from "react";
import "./more-button.component.scss";

const MoreButton = ({ type, children, className: newName, ...attr }) => {
  return (
    <button className={`more-button ${type} ${newName}`} {...attr}>
      {children}
    </button>
  );
};

export default MoreButton;
