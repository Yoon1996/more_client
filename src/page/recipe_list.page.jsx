import React, { useEffect, useState } from "react";
import RecipeItemComponent from "../component/recipe_item.component";
import RecipeItemListComponent from "../component/recipe_item_list.component";
import FilterButtonComponent from "../component/filter_button.component";
import "./recipe_list.page.scss";
import SearchComponent from "../component/search_component";
import { getRecipeList } from "../service/recipe.service";
import { useDispatch } from "react-redux";
import { setRecipes } from "../store/recipe.store";

const RecipeListpage = () => {
  const dispatch = useDispatch();

  const [currentList, setCurrentList] = useState([]);
  useEffect(() => {
    getRecipeList()
      .then((res) => {
        console.log("res: ", res);
        const current = res.data;
        setCurrentList(current);
        dispatch(setRecipes(res.data));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [currentList]);

  return (
    <>
      <div className="recipe_list">
        <div className="recipe_list__wrap">
          <SearchComponent></SearchComponent>
          {/* <div className="recipe_list__filter">
          <FilterButtonComponent></FilterButtonComponent>
        </div> */}
          <div className="recipe_list__main-content">
            <div className="recipe_list__list">
              <RecipeItemComponent></RecipeItemComponent>
              {currentList.length > 0 ? (
                <RecipeItemListComponent></RecipeItemListComponent>
              ) : (
                <div className="recipe_list__no-recipe-message">
                  <div>아직 동륵된 레시피가 없어요.</div>
                  <div>+ 버튼을 눌러 레시피를 등록해보세요.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeListpage;
