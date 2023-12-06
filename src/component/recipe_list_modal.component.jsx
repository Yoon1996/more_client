import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, editRecipe } from "../service/recipe.service";
import { setRecipes } from "../store/recipe.store";
import MoreButton from "./more-button.component";
import MoreInput from "./more-input.component";
import "./recipe_list_modal.component.scss";
import SearchWordComponent from "./search_word.component";

const RecipeListModalComponent = ({ isModalOpen, handleCancel, recipes }) => {
  const categoryDropItem = useSelector((rootState) => rootState.categoryList);
  const [changeCategory, setChangeCategory] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [recipeName, setRecipeName] = useState("");

  useEffect(() => {
    setRecipeName(recipes.recipeName);
    setChangeCategory(recipes.changeCategory);
    setIngredientList(recipes.ingredients);
  }, [recipes.recipeId]);

  const dispatch = useDispatch();

  //저장모드, params 서버에 전달
  const submit = (id) => {
    const params = {
      recipeName,
      categoryName: changeCategory,
      categoryId,
      ingredientList,
    };
    console.log("params: ", params);
    editRecipe(id, params)
      .then((res) => {
        console.log(res.data);
        if (res.data.isCategoryEmpty) {
          alert("카테고리 입력 바람");
        } else {
          dispatch(setRecipes(res.data));
          handleCancel();
        }
      })
      .catch((err) => {
        console.log("레시피등록err: ", err);
      });
  };

  //재료 추가 핸들러

  const [ingredientList, setIngredientList] = useState([
    { name: "", ea: 0, unit: "" },
  ]);

  const ingredientChange = (value, index) => {
    ingredientList[index].name = value;
    setIngredientList([...ingredientList]);
  };

  const eaChange = (value, index) => {
    ingredientList[index].ea = value;
    setIngredientList([...ingredientList]);
  };

  const unitChange = (value, index) => {
    ingredientList[index].unit = value;
    setIngredientList([...ingredientList]);
  };

  //삭제 메세지 모달 핸들러
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const closeModal = () => {
    setIsDeleteOpen(false);
  };

  const deleteRecipeMode = (id) => {
    setIsDeleteOpen(true);
    deleteRecipe(id)
      .then((res) => {
        console.log("res: ", res);
        dispatch(setRecipes(res.data));
        closeModal();
        handleCancel();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
    closeModal();
  };

  return (
    <>
      <Modal
        className="recipe-list__modal"
        width={1273}
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className="recipe-list__modal__feild">
          <div className="recipe-list__modal__title recipe-list__modal__size">
            <div>
              <input
                className="recipe-list__modal__title-input"
                type="text"
                value={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              ></input>
            </div>
          </div>
          <div className="recipe-list__modal__category recipe-list__modal__size">
            <div className="recipe-list__modal__sub-title">카테고리</div>
          </div>
          <div className="recipe-list__modal__ingredient-wrap">
            <div className="recipe-list__modal__sub-title">재료 리스트</div>
            {ingredientList.map((ingredient, index) => (
              <div
                key={index}
                className="recipe-list__modal__ingredient__list recipe-list__modal__size"
              >
                <div className="recipe-list__modal__ingredient__title">
                  <div className="recipe-list__modal__ingredient__sub-title">
                    재료명
                  </div>
                  <input
                    className="recipe-list__modal__ingredient__input recipe-list__modal__more-input"
                    type="text"
                    defaultValue={ingredient.name}
                    onChange={(e) => ingredientChange(e.target.value, index)}
                  ></input>
                </div>
                <div className="recipe-list__modal__ingredient__ea">
                  <div className="recipe-list__modal__ingredient__sub-title">
                    무게/수량
                  </div>
                  <div>
                    <input
                      className="recipe-list__modal__ingredient__input"
                      type="text"
                      defaultValue={ingredient.ea}
                      onChange={(e) => {
                        eaChange(e.target.value, index);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="recipe-list__modal__ingredient__unit">
                  <div className="recipe-list__modal__ingredient__sub-title">
                    단위
                  </div>

                  <div>
                    <input
                      className="recipe-list__modal__ingredient__input"
                      type="text"
                      defaultValue={ingredient.unit}
                      onChange={(e) => {
                        unitChange(e.target.value, index);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="recipe-list__modal__ingredient__delete">
                  <div className="recipe-list__modal__ingredient__delete__none">
                    &nbsp;
                  </div>
                  <button
                    onClick={() =>
                      setIngredientList([...ingredientList.slice(1)])
                    }
                    className="recipe-list__modal__ingredient__delete__button"
                  >
                    삭제
                  </button>
                </div>
              </div>
            ))}
            <div
              className="recipe-list__modal__add modal__size"
              onClick={() =>
                setIngredientList([
                  ...ingredientList,
                  { name: "", ea: 0, unit: "" },
                ])
              }
            >
              <img src="/icon/add.svg" alt="" />
            </div>
          </div>
          <div className="recipe-list__modal__util modal__size">
            <button className="modal__util__button" onClick={handleCancel}>
              취소
            </button>
            <button
              className="recipe-list__modal__util__button"
              onClick={() => submit(recipes.recipeId)}
            >
              수정
            </button>
            <button
              className="recipe-list__modal__util__button"
              onClick={() => deleteRecipeMode(recipes.recipeId)}
            >
              삭제
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        className="recipe-list__delete-modal"
        width={764}
        open={isDeleteOpen}
        onCancel={closeModal}
      >
        <div className="recipe-list__delete_modal__inner-feild">
          <div className="recipe-list__delete_modal__message">
            레시피를 정말 삭제하시겠어요?
          </div>
          <div className="recipe-list__delete_modal__button">
            <MoreButton
              onClick={() => {
                deleteRecipeMode(recipes.recipeId);
              }}
              type="fill"
            >
              네
            </MoreButton>
            <MoreButton onClick={closeModal} type="fill">
              아니오
            </MoreButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecipeListModalComponent;
