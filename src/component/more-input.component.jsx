import React from "react";
import "./more-input.component.scss";

const MoreInput = ({ showCheck, children, className: newName, ...attr }) => {
  return (
    <>
      <div className="more-input__wrap">
        <input className={`more-input ${newName}`} {...attr}>
          {children}
        </input>
        {showCheck ? (
          <div className="more-input__check">
            <img src="/icon/check.svg" alt="" />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default MoreInput;
