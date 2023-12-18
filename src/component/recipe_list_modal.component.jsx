import { Modal } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteRecipe, editRecipe, getRecipe } from "../service/recipe.service";
import { sendUrl } from "../service/url.service";
import { setRecipes } from "../store/recipe.store";
import MoreButton from "./more-button.component";
import "./recipe_list_modal.component.scss";
import SearchWordComponent from "./search_word.component";

const RecipeListModalComponent = ({ isModalOpen, handleCancel, recipes }) => {
  const [recipeName, setRecipeName] = useState(recipes.recipeName);
  const [changeCategory, setChangeCategory] = useState(recipes.changeCategory);
  const [categoryId, setCategoryId] = useState(recipes.categoryId);
  const [ingredientId, setIngredientId] = useState(null);
  const [nameErrors, setNameErrors] = useState({});
  const [categoryErrors, setCategoryErrors] = useState({});
  const [ingErrors, setIngErrors] = useState({});
  const [isChangeCategory, setIsChangeCategory] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [url, setUrl] = useState(recipes.url);
  const dispatch = useDispatch();
  const [selectedFile, setSelctedFile] = useState(null);
  const [sendedUrl, setSendedUrl] = useState(null);
  const instance = axios.create({
    headers: null,
  });

  //정규식
  var numCheck = /\d/;

  //레시피 정보 가져오기
  useEffect(() => {
    getRecipe(recipes.recipeId)
      .then((res) => {
        console.log("레시피: ", res);
        setRecipeName(res.data.name);
        setChangeCategory(res.data.categoryName);
        const RecipeIngredientId = res.data.Ingredients.map((item) => item.id);
        setIngredientId(RecipeIngredientId);
        setIngredientList(res.data.Ingredients);
        setUrl(res.data.url);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, [recipes.recipeId, isModalOpen, handleCancel]);
  console.log(recipes.url);

  //파일 등록
  const handleFileChange = (e) => {
    setSelctedFile(e.target.files[0]);
  };

  const uploadImageToS3 = (url, file) => {
    instance
      .put(url, file)
      .then((res) => {
        // console.log("res: ", res);
        const urlData = res.config.url;
        const question = [...urlData].findIndex((data) => data === "?");
        setSendedUrl([...urlData].splice(0, question).join(""));
        // console.log("question: ", question);
        // 스프레드 연산자로 감싸고 물음표값의 인덱스를 찾는다.
        // splice 로 물음표인덱스부터 url의 전체 길이에서 물음표가 있는 길이까지 자른다.
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  const uploadFile = async () => {
    try {
      const result = await sendUrl({ filename: selectedFile.name });
      // console.log("result: ", result);
      const presignedUrl = result.data;
      // console.log("presignedUrl: ", presignedUrl);
      uploadImageToS3(presignedUrl, selectedFile);
    } catch (err) {
      console.log("err: ", err);
    }
  };

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

  const checkHandler = () => {
    nameCheck();
    categoryCheck();
    ingredientCheck();
  };

  //수정모드로 전환
  const editMode = () => {
    setIsEditMode(true);
    setIsChangeCategory(true);
  };

  //저장모드, params 서버에 전달
  const submit = async (id) => {
    const recipeParam = {
      recipeId: id,
      recipeName: recipeName,
      categoryName: changeCategory,
      categoryId: recipes.categoryId,
      ingredientList,
      url: sendedUrl,
    };

    if (!recipeName && !changeCategory) {
      checkHandler();
    } else if (!recipeName || !changeCategory) {
      checkHandler();
    } else {
      checkHandler();
      if (
        !nameErrors?.name?.require &&
        !categoryErrors?.category?.select &&
        !ingErrors?.ingredient?.blank
      ) {
        uploadFile();
        try {
          const result = await editRecipe(id, recipeParam);
          console.log("수정result: ", result);
          dispatch(setRecipes(result.data));
          setIsEditMode(false);
          setIsChangeCategory(false);
          // handleCancel();
        } catch (error) {
          console.log("error: ", error);
        }
      }
    }
  };

  const cancelHandler = () => {
    handleCancel();
    setIsEditMode(false);
    setIsChangeCategory(false);
    setRecipeName(recipes.recipeName);
    setChangeCategory(recipes.changeCategory);
    setNameErrors(null);
    setCategoryErrors(null);
    setIngErrors(null);
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
          <div className="recipe-list__modal__size">
            {isEditMode ? (
              <input
                className="recipe-list__modal__title-input"
                type="text"
                defaultValue={recipes.recipeName}
                onChange={(e) => setRecipeName(e.target.value)}
              ></input>
            ) : (
              <div className="recipe-list__modal__title">{recipeName}</div>
            )}
            {isEditMode ? (
              <div className="recipe-list__modal__hint">
                {nameErrors?.name?.require ? (
                  <p>{nameErrors?.name?.require}</p>
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
          </div>
          {isEditMode ? (
            <input type="file" onChange={handleFileChange} />
          ) : (
            <div className="recipe-list__modal__image">
              <img
                src={url}
                alt=""
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </div>
          )}
          <div className="recipe-list__modal__category recipe-list__modal__size">
            <div className="recipe-list__modal__sub-title">카테고리</div>
            {isEditMode ? (
              <div className="recipe-list__modal__hint">
                {categoryErrors?.category?.select ? (
                  <div>{categoryErrors?.category?.select}</div>
                ) : null}
              </div>
            ) : (
              ""
            )}
            {isChangeCategory ? (
              <SearchWordComponent
                editMode={true}
                checked={recipes.categoryId}
                type={"no_close"}
                selectMenu={selectMenu}
              ></SearchWordComponent>
            ) : (
              <div className="recipe-list__modal__category-menu">
                {changeCategory}
              </div>
            )}
          </div>
          <div className="recipe-list__modal__ingredient modal__size">
            <div className="recipe-list__modal__with-hint">
              <div className="recipe-list__modal__sub-title">재료 리스트</div>
              {isEditMode ? (
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
              ) : (
                ""
              )}
            </div>
            {ingredientList.map((ingredient, index) => (
              <div
                key={index}
                className="recipe-list__modal__ingredient__list recipe-list__modal__size"
              >
                <div className="recipe-list__modal__ingredient__title">
                  <div className="recipe-list__modal__ingredient__sub-title">
                    재료명
                  </div>
                  {isEditMode ? (
                    <input
                      className="recipe-list__modal__ingredient__input recipe-list__modal__more-input"
                      type="text"
                      defaultValue={ingredient.name}
                      onChange={(e) => ingredientChange(e.target.value, index)}
                    ></input>
                  ) : (
                    <div>{ingredient.name}</div>
                  )}
                </div>
                <div className="recipe-list__modal__ingredient__ea">
                  <div className="recipe-list__modal__ingredient__sub-title">
                    무게/수량
                  </div>
                  <div>
                    {isEditMode ? (
                      <input
                        className="recipe-list__modal__ingredient__input"
                        type="text"
                        defaultValue={ingredient.ea}
                        onChange={(e) => {
                          eaChange(e.target.value, index);
                        }}
                      ></input>
                    ) : (
                      <div>{ingredient.ea}</div>
                    )}
                  </div>
                </div>
                <div className="recipe-list__modal__ingredient__unit">
                  <div className="recipe-list__modal__ingredient__sub-title">
                    단위
                  </div>

                  <div>
                    {isEditMode ? (
                      <input
                        className="recipe-list__modal__ingredient__input"
                        type="text"
                        defaultValue={ingredient.unit}
                        onChange={(e) => {
                          unitChange(e.target.value, index);
                        }}
                      ></input>
                    ) : (
                      <div>{ingredient.unit}</div>
                    )}
                  </div>
                </div>
                <div className="recipe-list__modal__ingredient__delete">
                  <div className="recipe-list__modal__ingredient__delete__none">
                    &nbsp;
                  </div>
                  {isEditMode ? (
                    <button
                      onClick={() =>
                        setIngredientList([...ingredientList.slice(1)])
                      }
                      className="recipe-list__modal__ingredient__delete__button"
                    >
                      삭제
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
            {isEditMode ? (
              <div
                className="recipe-list__modal__add modal__size"
                onClick={() =>
                  setIngredientList([
                    ...ingredientList,
                    { name: "", ea: "", unit: "" },
                  ])
                }
              >
                <img src="/icon/add.svg" alt="" />
              </div>
            ) : null}
          </div>

          <div className="recipe-list__modal__util modal__size">
            <button
              className="recipe-list__modal__util__button"
              onClick={cancelHandler}
            >
              취소
            </button>
            {isEditMode ? (
              <button
                className="recipe-list__modal__util__button"
                onClick={() => submit(recipes.recipeId)}
              >
                저장
              </button>
            ) : (
              <button
                className="recipe-list__modal__util__button"
                onClick={editMode}
              >
                수정하기
              </button>
            )}

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
