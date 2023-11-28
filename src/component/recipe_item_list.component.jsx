import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe, getRecipeList } from "../service/recipe.service";
import { setRecipes } from "../store/recipe.store";
import "./recipe_item_list.component.scss";
import RecipeListModalComponent from "./recipe_list_modal.component";
import StarButton from "./starButton.component";

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

  const [changeCategory, setChangeCategory] = useState("");
  const [recipeName, setRecipeName] = useState("");
  const [ingredients, setIngredients] = useState([]);

  //레시피 정보 가져오는 핸들러
  const getRecipes = (id) => {
    getRecipe(id)
      .then((res) => {
        console.log("res??: ", res.data);
        setRecipeId(res.data.id);
        setRecipeName(res.data.name);
        setChangeCategory(res.data.categoryName);
        setIngredients(res.data.Ingredients);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <>
      {recipies.map((recipe) => (
        <div className="recipeList__item" key={recipe.id}>
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
              <StarButton value={recipe.id}></StarButton>
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
          changeCategory,
          recipeName,
          ingredients,
        }}
      ></RecipeListModalComponent>
    </>
  );
};

export default RecipeItemListComponent;
