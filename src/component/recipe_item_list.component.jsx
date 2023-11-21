import React, { useEffect, useState } from "react";
import "./recipe_item_list.component.scss";
import { getRecipe, getRecipeList } from "../service/recipe.service";
import { useDispatch, useSelector } from "react-redux";
import { setRecipes } from "../store/recipe.store";
import RecipeListModalComponent from "./recipe_list_modal.component";

const RecipeItemListComponent = () => {
  const dispatch = useDispatch();
  const recipies = useSelector((rootState) => rootState.recipe);

  useEffect(() => {
    getRecipeList()
      .then(function (res) {
        dispatch(setRecipes(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const [recipeId, setRecipeId] = useState(0);

  //모달창 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  //모달창 보여주기
  const showModal = (id) => {
    setIsModalOpen((current) => !current);
    if (id) getRecipes(id);
  };

  //모달창 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //레시피 정보 가져오는 핸들러
  const getRecipes = (id) => {
    getRecipe(id)
      .then((res) => {
        // console.log("res: ", res);
        setRecipeId(res.data.id);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //북마크 로고 변경
  const [bookmark, setBookmark] = useState("bookmark-outline");

  const registBookmark = (id) => {
    console.log(id);
  };

  return (
    <>
      {recipies.map((recipe, index) => (
        <div className="recipeList__item" key={index}>
          <div
            className="recipeList__photobox"
            onClick={() => showModal(recipe.id)}
          >
            <img src="/icon/bread.png" alt="" />
          </div>
          <div className="recipeList__bottom">
            <div className="recipeList__bottom-nameBookmark">
              <div
                onClick={() => showModal(recipe.id)}
                className="recipeList__bottom-name"
              >
                {recipe?.name}
              </div>
              <div className="recipeList__bottom-bookmark"></div>
              <img
                onClick={() => registBookmark(recipe.id)}
                src={`/icon/${bookmark}.svg`}
                alt=""
              />
            </div>
            <div className="recipeList__bottom-timeWrap">
              <div className="recipeList__bottom-time">등록일:23.10.10</div>
            </div>
          </div>
        </div>
      ))}
      <RecipeListModalComponent
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        recipes={{
          recipeId,
        }}
      ></RecipeListModalComponent>
    </>
  );
};

export default RecipeItemListComponent;
