import React, { useEffect, useState } from "react";
import "./bookmark_component.scss";
import { Switch } from "antd";
import DropdownComponent from "./dropdown_component";
import { bookmarkCreate } from "../service/bookmark.service";
import { getRecipeList } from "../service/recipe.service";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../store/recipe.store";

const BookmarkComponent = ({ type, setType }) => {
  useEffect(() => {
    console.log("type: ", type);
  }, [type]);

  const dispatch = useDispatch();
  const [isSwitch, setisSwitch] = useState(false);

  const getBookmarkRecipes = () => {
    setisSwitch(true);
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
    setisSwitch(false);
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
