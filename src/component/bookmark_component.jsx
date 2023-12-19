import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipeList } from "../service/recipe.service";
import { setRecipes } from "../store/recipe.store";
import "./bookmark_component.scss";
import DropdownComponent from "./dropdown_component";

const BookmarkComponent = ({ type, setType }) => {
  const dispatch = useDispatch();
  const [isSwitch, setIsSwitch] = useState(false);

  const getBookmarkRecipes = () => {
    setIsSwitch(true);
    getRecipeList("북마크")
      .then((res) => {
        console.log("res: ", res.data);
        dispatch(setRecipes(res.data));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const getWholeRecipes = () => {
    setIsSwitch(false);
    getRecipeList()
      .then((res) => {
        console.log("res: ", res);
        dispatch(setRecipes(res.data));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <>
      <div className="switch__wrap">
        <Switch
          onClick={isSwitch ? getWholeRecipes : getBookmarkRecipes}
          className="switch__icon"
          defaultChecked={false}
        ></Switch>
        <div className="switch__bookmark">즐겨찾기</div>
        <DropdownComponent></DropdownComponent>
      </div>
    </>
  );
};

export default BookmarkComponent;
