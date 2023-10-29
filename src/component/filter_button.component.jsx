import { Button } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipe, getRecipeList } from "../service/recipe.service";
import { setRecipes } from "../store/recipe.store";
import "./filter_button.component.scss";

const FilterButtonComponent = () => {
  const viewCategoryList = useSelector((rootState) => rootState.categoryList);
  const dispatch = useDispatch();

  //전체 카테고리 보여주기
  const AllCategoryHandler = () => {
    getRecipeList()
      .then((res) => {
        dispatch(setRecipes(res.data));
      })
      .then((err) => {
        console.log("err: ", err);
      });
  };

  //카테고리 목록 필터링 해주기
  const categoryFilterHandler = (categoryId) => {
    filterRecipe(categoryId)
      .then(function (res) {
        console.log("res: ", res);
        dispatch(setRecipes(res.data));
      })
      .then(function (err) {
        console.log("err: ", err);
      });
  };
  return (
    <>
      <div className="filter_button__wrap">
        <Button className="filter_button__button" onClick={AllCategoryHandler}>
          전체보기
        </Button>
        {viewCategoryList.map((category, index) => (
          <Button
            className="filter_button__button"
            onClick={() => {
              categoryFilterHandler(category.id);
            }}
            key={index}
          >
            {category?.name}
          </Button>
        ))}
      </div>
    </>
  );
};

export default FilterButtonComponent;
