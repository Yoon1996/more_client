import React from "react";
import "./more-input.component.scss";

const MoreInput = ({ children, className: newName, ...attr }) => {
  return (
    <input className={`more-input ${newName}`} {...attr}>
      {children}
    </input>
  );
};

export default MoreInput;
