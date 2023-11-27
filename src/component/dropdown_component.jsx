import React, { useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import "./dropdown_component.scss";
import { getRecipeList } from "../service/recipe.service";
import { useDispatch } from "react-redux";
import { setRecipes } from "../store/recipe.store";

const DropdownComponent = () => {
  const dispatch = useDispatch();
  const [category, setCategory] = useState("최신순");
  const [isDrop, setIsDrop] = useState(false);
  const categoryList = ["최신순", "조회순", "자주 본 순"];

  const dropDown = () => {
    setIsDrop((isDrop) => !isDrop);
  };

  const selectMenu = (event) => {
    const clickedValue = event.target.innerText;
    setCategory(clickedValue);
    setIsDrop(false);

    getRecipeList(clickedValue)
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
      <div className="dropdown__wrap" onClick={dropDown}>
        <div className="dropdown__dropdown">{category}</div>
        <div className="dropdown__carrot">
          <FaCaretDown />
        </div>
      </div>
      {isDrop ? (
        <ul className="dropdown__menu-wrap">
          {categoryList.map((category) => (
            <li className="dropdown__menu" onClick={selectMenu}>
              {category}
            </li>
          ))}
        </ul>
      ) : null}
    </>
  );
};

export default DropdownComponent;
