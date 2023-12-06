import React from "react";
import "./more-button.component.scss";

const MoreButton = ({
  type,
  children,
  className: newName,
  getmessage,
  checkedButton,
  id,
  ...attr
}) => {
  return (
    <button
      onClick={(e) => {
        getmessage(e);
        checkedButton(id);
      }}
      className={`more-button ${type} ${newName}`}
      {...attr}
    >
      {children}
    </button>
  );
};

export default MoreButton;
