import React, { useEffect } from "react";
import "./bookmark_component.scss";
import { Switch } from "antd";
import DropdownComponent from "./dropdown_component";

const BookmarkComponent = ({ type, setType }) => {
  useEffect(() => {
    console.log("type: ", type);
  }, [type]);
  return (
    <>
      <div className="switch__wrap">
        <Switch
          className="switch__icon"
          defaultChecked
          handleBg="#000000"
        ></Switch>
        <div className="switch__bookmark">즐겨찾기</div>
        <DropdownComponent></DropdownComponent>
      </div>
    </>
  );
};

export default BookmarkComponent;
