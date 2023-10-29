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

  return (
    <>
      {recipies.map((recipe, index) => (
        <div
          onClick={() => showModal(recipe.id)}
          className="recipeList__item"
          key={index}
        >
          {recipe?.name}
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
