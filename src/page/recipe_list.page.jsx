import React from "react";
import RecipeItemComponent from "../component/recipe_item.component";
import RecipeItemListComponent from "../component/recipe_item_list.component";
import FilterButtonComponent from "../component/filter_button.component";
import "./recipe_list.page.scss";

const RecipeListpage = () => {
  return (
    <>
      <div className="recipe_list__wrap">
        <div className="recipe_list__filter">
          <FilterButtonComponent></FilterButtonComponent>
        </div>
        <div className="recipe_list__main-content">
          <div className="recipe_list__list">
            <RecipeItemComponent></RecipeItemComponent>
            <RecipeItemListComponent></RecipeItemListComponent>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeListpage;
