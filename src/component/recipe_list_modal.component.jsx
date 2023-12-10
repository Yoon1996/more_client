import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, editRecipe } from "../service/recipe.service";
import { setRecipes } from "../store/recipe.store";
import MoreButton from "./more-button.component";
import "./recipe_list_modal.component.scss";
import SearchWordComponent from "./search_word.component";

const RecipeListModalComponent = ({ isModalOpen, handleCancel, recipes }) => {
  const [changeCategory, setChangeCategory] = useState("");
  const [categoryId, setCategoryId] = useState(null);
  const [recipeName, setRecipeName] = useState("");
  const [nameErrors, setNameErrors] = useState({});
  const [categoryErrors, setCategoryErrors] = useState({});
  const [ingErrors, setIngErrors] = useState({});
  const [isChangeCategory, setIsChangeCategory] = useState(false);

  //정규식
  var numCheck = /\d/;

  useEffect(() => {
    setRecipeName(recipes.recipeName);
    setChangeCategory(recipes.changeCategory);
    setIngredientList(recipes.ingredients);
    setCategoryId(recipes.categoryId);
    console.log(recipes);
  }, []);

  const dispatch = useDispatch();

  //이름 빈칸체크
  const nameCheck = () => {
    if (!recipeName) {
      setNameErrors({
        ...nameErrors,
        name: { require: "레시피 이름을 입력해주세요!" },
      });
    } else {
      setNameErrors({
        ...nameErrors,
        name: null,
      });
    }
  };

  // 카테고리 체크
  const categoryCheck = () => {
    if (changeCategory.length > 0) {
      setCategoryErrors({
        ...categoryErrors,
        category: null,
      });
    } else {
      setCategoryErrors({
        ...categoryErrors,
        category: { select: "카테고리를 선택해주세요!" },
      });
    }
  };

  //카테고리 변경 컴포넌트 보여주기
  const categoryChangeHandler = () => {
    setIsChangeCategory(true);
  };

  //재료 추가 핸들러
  const [ingredientList, setIngredientList] = useState([
    { name: "", ea: "", unit: "" },
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

  //ingredient 빈칸 체크
  const ingredientfound = ingredientList.find((ingredient) => {
    if (!ingredient.name || !ingredient.ea || !ingredient.unit) {
      return false;
    } else {
      return true;
    }
  });

  const ingredientCheck = () => {
    if (!ingredientfound) {
      setIngErrors({
        ...ingErrors,
        ingredient: { blank: "재료명, 무게/수량, 단위를 모두 기입해주세요!" },
      });
    } else {
      if (!numCheck.test(ingredientList.ea)) {
        setIngErrors({
          ...ingErrors,
          ingredient: { pleaseNum: "무게/수량칸은 숫자만 기입해주세요." },
        });
      }
      setIngErrors({
        ...ingErrors,
        ingredient: null,
      });
    }
  };

  //저장모드, params 서버에 전달
  const submit = async (id) => {
    const recipeParam = {
      recipeId: id,
      recipeName,
      categoryName: changeCategory,
      categoryId,
      ingredientList,
    };
    console.log("recipeParam: ", recipeParam);
    nameCheck();
    categoryCheck();
    ingredientCheck();

    try {
      if (
        !nameErrors?.name?.require &&
        !categoryErrors?.category?.select &&
        !ingErrors?.ingredient?.blank
      ) {
        const result = await editRecipe(id, recipeParam);
        console.log("result: ", result);
        dispatch(setRecipes(result.data));
        handleCancel();
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const selectMenu = (e) => {
    const clickedValue = e.target.innerText;
    console.log("clickedValue: ", clickedValue);
    setChangeCategory(clickedValue);
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
                value={recipes.recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              ></input>
              <div className="recipe-list__modal__hint">
                {nameErrors?.name?.require ? (
                  <p>{nameErrors?.name?.require}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
          <div className="recipe-list__modal__category recipe-list__modal__size">
            <div className="recipe-list__modal__category__with-button">
              <div className="recipe-list__modal__sub-title">카테고리</div>
              <div
                className="recipe-list__modal__category__change-bt"
                onClick={categoryChangeHandler}
              >
                카테고리 변경하기
              </div>
            </div>
            <div className="recipe-list__modal__hint">
              {categoryErrors?.category?.select ? (
                <div>{categoryErrors?.category?.select}</div>
              ) : null}
            </div>
            {isChangeCategory ? (
              <SearchWordComponent
                editMode={true}
                checked={recipes.categoryId}
                type={"no_close"}
                selectMenu={selectMenu}
              ></SearchWordComponent>
            ) : (
              <div className="recipe-list__modal__category-menu">
                {recipes.changeCategory}
              </div>
            )}
          </div>
          <div className="recipe-list__modal__ingredient-wrap">
            <div className="recipe-list__modal__with-hint">
              <div className="recipe-list__modal__sub-title">재료 리스트</div>
              <div className="recipe-list__modal__hint">
                {ingErrors?.ingredient?.blank ? (
                  <div>{ingErrors?.ingredient?.blank}</div>
                ) : (
                  ""
                )}
                {ingErrors?.ingredient?.pleaseNum ? (
                  <div>{ingErrors?.ingredient?.pleaseNum}</div>
                ) : (
                  ""
                )}
              </div>
            </div>
            {recipes.ingredients.map((ingredient, index) => (
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
            <button
              className="recipe-list__modal__util__button"
              onClick={handleCancel}
            >
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
