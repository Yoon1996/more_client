import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RecipeItemComponent from "../component/recipe_item.component";
import RecipeItemListComponent from "../component/recipe_item_list.component";
import SearchComponent from "../component/search_component";
import { getRecipeList } from "../service/recipe.service";
import { setRecipes } from "../store/recipe.store";
import "./recipe_list.page.scss";
import BookmarkComponent from "../component/bookmark_component";

const RecipeListpage = () => {
  // const [currentList, setCurrentList] = useState([]);
  const currentRecipes = useSelector((rootState) => rootState.recipe);
  const dispatch = useDispatch();
  useEffect(() => {
    getRecipeList()
      .then((res) => {
        console.log("res: ", res);
        const current = res.data;
        dispatch(setRecipes(current));
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  //북마크 체인지
  const [switchOn, setSwitchOn] = useState("");

  const changeBookMark = () => {
    console.log("changeBookMark: ");
    setSwitchOn("on");
  };

  return (
    <>
      <div className="recipe_list">
        <div className="recipe_list__wrap">
          <SearchComponent></SearchComponent>
          <div>
            <BookmarkComponent
              setType={changeBookMark}
              type={switchOn}
            ></BookmarkComponent>
          </div>
          {/* <div className="recipe_list__filter">
          <FilterButtonComponent></FilterButtonComponent>
        </div> */}
          <div className="recipe_list__main-content">
            <div className="recipe_list__list">
              {currentRecipes.length > 0 ? (
                <>
                  <RecipeItemListComponent></RecipeItemListComponent>
                  <RecipeItemComponent></RecipeItemComponent>
                </>
              ) : (
                <>
                  <RecipeItemComponent></RecipeItemComponent>
                  <div className="recipe_list__no-recipe-message">
                    <div>아직 동륵된 레시피가 없어요.</div>
                    <div>+ 버튼을 눌러 레시피를 등록해보세요.</div>
                  </div>
                </>
              )}
              {/* <RecipeItemComponent></RecipeItemComponent> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeListpage;
