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

  //수정 핸들러
  const [isEditMode, setIsEditMode] = useState(false);

  //수정모드
  const enableEditMode = () => {
    setIsEditMode(true);
  };

  //저장모드, params 서버에 전달
  const submit = (id) => {
    const params = {
      recipeName,
      categoryName: changeCategory,
      categoryId,
      ingredientList,
    };
    console.log("params: ", params);
    setIsEditMode(false);
    editRecipe(id, params)
      .then((res) => {
        console.log(res.data);
        if (res.data.isCategoryEmpty) {
          alert("카테고리 입력 바람");
        } else {
          dispatch(setRecipes(res.data));
        }
      })
      .catch((err) => {
        console.log("레시피등록err: ", err);
      });
  };

  //레시피 삭제
  // const deleteRecipeMode = (id) => {
  //   if (window.confirm("정말 삭제하시겠습니까?")) {
  //     deleteRecipe(id)
  //       .then((res) => {
  //         dispatch(setRecipes(res.data));
  //         handleCancel();
  //       })
  //       .catch((err) => {
  //         console.log("err: ", err);
  //       });
  //     alert("삭제되었습니다.");
  //   } else {
  //     alert("취소되었습니다.");
  //   }
  // };

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
        className="modal"
        width={1273}
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className="modal__feild">
          <div className="modal__title modal__size">
            <div>
              <MoreInput
                type="text"
                defaultValue={recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              ></MoreInput>
            </div>
          </div>
          <div className="modal__category modal__size">
            <div className="modal__sub-title">카테고리</div>
            <SearchWordComponent type={"no_close"}></SearchWordComponent>
          </div>
          {ingredientList.map((ingredient, index) => (
            <div key={index} className="modal__ingredient__list modal__size">
              <div className="modal__ingredient__title">
                <div className="modal__ingredient__sub-title">재료명</div>
                <MoreInput
                  className="modal__ingredient__title-input modal__more-input"
                  type="text"
                  defaultValue={ingredient.name}
                  onChange={(e) => ingredientChange(e.target.value, index)}
                ></MoreInput>
              </div>
              <div className="modal__ingredient__ea">
                <div className="modal__ingredient__sub-title">무게/수량</div>
                <div>
                  <MoreInput
                    type="text"
                    defaultValue={ingredient.ea}
                    onChange={(e) => {
                      eaChange(e.target.value, index);
                    }}
                  ></MoreInput>
                </div>
              </div>
              <div className="modal__ingredient__unit">
                <div className="modal__ingredient__sub-title">단위</div>

                <div>
                  <MoreInput
                    type="text"
                    defaultValue={ingredient.unit}
                    onChange={(e) => {
                      unitChange(e.target.value, index);
                    }}
                  ></MoreInput>
                </div>
              </div>
              <div className="modal__ingredient__delete">
                <div className="modal__ingredient__delete__none"></div>
                <MoreButton
                  type="outline"
                  className="modal__ingredient__delete__button"
                >
                  재료 삭제
                </MoreButton>
              </div>
            </div>
          ))}
          <div className="modal__util modal__size">
            <MoreButton
              type="outline"
              className="modal__util__button"
              onClick={handleCancel}
            >
              취소
            </MoreButton>
            <MoreButton
              type="outline"
              className="modal__util__button"
              onClick={() => submit(recipes.recipeId)}
            >
              저장
            </MoreButton>
            <MoreButton
              type="outline"
              className="modal__util__button"
              onClick={() => deleteRecipeMode(recipes.recipeId)}
            >
              삭제
            </MoreButton>
          </div>
        </div>
      </Modal>
      {/* <DeleteModal
        openModal={isDeleteOpen}
        closeModal={closeModal}
        id={id}
        handleCancel={handleCancel}
      ></DeleteModal> */}
      <Modal
        className="delete-modal"
        width={764}
        open={isDeleteOpen}
        onCancel={closeModal}
      >
        <div className="delete_modal__inner-feild">
          <div className="delete_modal__message">
            레시피를 정말 삭제하시겠어요?
          </div>
          <div className="delete_modal__button">
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
