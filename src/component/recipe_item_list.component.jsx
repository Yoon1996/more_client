import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipe, getRecipeList } from "../service/recipe.service";
import { setRecipes } from "../store/recipe.store";
import "./recipe_item_list.component.scss";
import RecipeListModalComponent from "./recipe_list_modal.component";
import StarButton from "./starButton.component";
import { async } from "rxjs";

const RecipeItemListComponent = () => {
  const [recipeName, setRecipeName] = useState("");
  const [changeCategory, setChangeCategory] = useState("");
  const [recipeId, setRecipeId] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  const [url, setUrl] = useState();
  const dispatch = useDispatch();
  const recipies = useSelector((rootState) => rootState.recipe);

  useEffect(() => loadRecipeList(), []);
  useEffect(
    () => {
      // console.log("recipeName: ", recipeName);
      // console.log("changeCategory: ", changeCategory);
      // console.log("recipeId: ", recipeId);
      // console.log("ingredients: ", ingredients);
      // console.log("categoryId: ", categoryId);
      // console.log("url: ", url);
    },
    [recipeName, changeCategory, recipeId],
    ingredients,
    categoryId,
    url
  );

  const loadRecipeList = () => {
    getRecipeList()
      .then(function (res) {
        dispatch(setRecipes(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //모달창 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  //모달창 보여주기
  const showModal = (id) => {
    setIsModalOpen((current) => !current);
    if (id) getRecipes(id);
  };

  // 모달창 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
    console.log("리스트에서 닫기");
  };

  //레시피 정보 가져오는 핸들러
  const getRecipes = async (id) => {
    console.log("id: ", id);
    try {
      const res = await getRecipe(id);
      // console.log("res: ", res);
      setRecipeId(res.data.id);
      setRecipeName(res.data.name);
      setChangeCategory(res.data.categoryName);
      setIngredients(res.data.Ingredients);
      setCategoryId(res.data.categoryId);
      setUrl(res.data.url);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <>
      {recipies.map((recipe) => (
        <div className="recipeList__item" key={recipe.id}>
          <div
            className="recipeList__photobox"
            onClick={() => showModal(recipe.id)}
          >
            <img src={recipe.url} alt="" />
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
              <StarButton
                recipe={recipe}
                loadRecipeList={loadRecipeList}
              ></StarButton>
            </div>
            <div className="recipeList__bottom-timeWrap">
              <div className="recipeList__bottom-time">
                등록일:
                {recipe?.createdAt
                  ? new Date(recipe.createdAt).toLocaleDateString("ko-KR", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      ))}
      <RecipeListModalComponent
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        recipes={{
          recipeId,
          recipeName,
          categoryId,
          changeCategory,
          ingredients,
          url,
        }}
      ></RecipeListModalComponent>
    </>
  );
};

export default RecipeItemListComponent;
