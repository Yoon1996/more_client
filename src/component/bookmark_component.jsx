import React, { useEffect } from "react";
import "./bookmark_component.scss";
import { Switch } from "antd";
import DropdownComponent from "./dropdown_component";
import { bookmarkCreate } from "../service/bookmark.service";

const BookmarkComponent = ({ type, setType }) => {
  useEffect(() => {
    console.log("type: ", type);
  }, [type]);

  const getBookmarkRecipes = () => {
    console.log(1);
  };

  return (
    <>
      <div className="switch__wrap">
        <Switch
          onClick={getBookmarkRecipes}
          className="switch__icon"
          defaultChecked
        ></Switch>
        <div className="switch__bookmark">즐겨찾기</div>
        <DropdownComponent></DropdownComponent>
      </div>
    </>
  );
};

export default BookmarkComponent;
