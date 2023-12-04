import { Modal } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { viewCategories } from "../service/category.service";
import { create } from "../service/recipe.service";
import MoreButton from "./more-button.component";
import MoreInput from "./more-input.component";
import "./recipe_item.component.scss";
import SearchWordComponent from "./search_word.component";

const RecipeItemComponent = () => {
  const [recipeName, setRecipeName] = useState("");

  const navigate = useNavigate();
  const [changeCategory, setChangeCategory] = useState("");
  const [errors, setErrors] = useState({});

  //모달창 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  //모달창 보여주기
  const showModal = () => {
    setIsModalOpen(true);
  };
  //모달창 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  //레시피 등록 유효성 검사
  const recipeValidator = () => {
    const errors = {};

    if (!recipeName) {
      errors.name = { require: "레시피 이름을 입력해주세요." };
    }

    if (!changeCategory) {
      errors.categoryName = { require: "카테고리를 선택해주세요." };
    }

    return errors;
  };

  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    viewCategories()
      .then((res) => {
        console.log("res: ", res.data);
        setCategoryList(res.data);
        console.log("categoryList: ", categoryList);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);

  const selectMenu = (e) => {
    const clickedValue = e.target.innerText;
    console.log("clickedValue: ", clickedValue);
    setChangeCategory(clickedValue);
  };

  //레시피 등록 이벤트
  const recipeCreate = () => {
    const recipeParam = {
      name: recipeName,
      ingredientList,
      categoryName: changeCategory,
    };

    const errorCheckrRes = recipeValidator(recipeParam);

    create(recipeParam)
      .then(function (res) {
        console.log("성공이니?", res);
        setIsModalOpen(false);
        navigate("/");
      })
      .catch(function (error) {
        console.log("ssserror: ", error);
        if (error.response.data.statusMessage === "DUPLICATED_NAME") {
          setErrors({
            ...errors,
            name: { require: "동일한 레시피의 이름이 존재합니다." },
          });
        }
      });
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

  return (
    <>
      <div className="recipe__item">
        <img
          onClick={showModal}
          className="recipe__item-add"
          src="/icon/add.svg"
          alt=""
        />
      </div>
      <Modal
        className="modal"
        title=""
        width={1273}
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className="modal__feild">
          <div className="modal__title modal__size">
            <MoreInput
              type="text"
              onChange={(e) => {
                setRecipeName(e.target.value);
              }}
              placeholder="메뉴를 입력해주세요!"
              className="modal__more-input"
            ></MoreInput>
            <div className="modal__hint">
              {errors?.name?.require ? <p>{errors?.name?.require}</p> : ""}
            </div>
          </div>
          <div className="modal__category modal__size">
            <div className="modal__sub-title">카테고리</div>
            <SearchWordComponent
              categoryList={categoryList}
              type={"no_close"}
              selectMenu={selectMenu}
            ></SearchWordComponent>
            <div className="modal__hint">
              {errors?.categoryName?.require ? (
                <p>{errors?.categoryName?.require}</p>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="modal__ingredient modal__size">
            <div className="modal__sub-title">재료 리스트</div>
            {ingredientList.map((ingredient, index) => (
              <div key={index} className="modal__ingredient__list modal__size">
                <div className="modal__ingredient__title">
                  <div className="modal__ingredient__sub-title">재료명</div>
                  <MoreInput
                    className="modal__ingredient__title-input modal__more-input"
                    type="text"
                    value={ingredient.name}
                    onChange={(e) => ingredientChange(e.target.value, index)}
                    placeholder="재료명을 입력해주세요!"
                  ></MoreInput>
                </div>
                <div className="modal__ingredient__ea">
                  <div className="modal__ingredient__sub-title">무게/수량</div>
                  <MoreInput
                    type="text"
                    value={ingredient.ea}
                    onChange={(e) => {
                      eaChange(e.target.value, index);
                    }}
                    placeholder="숫자만 입력해 주세요"
                    className="modal__more-input"
                  ></MoreInput>
                </div>
                <div className="modal__ingredient__unit">
                  <div className="modal__ingredient__sub-title">단위</div>
                  <MoreInput
                    type="text"
                    value={ingredient.unit}
                    onChange={(e) => {
                      unitChange(e.target.value, index);
                    }}
                    placeholder="g, kg, 개, tsp 등"
                    className="modal__more-input"
                  ></MoreInput>
                </div>
                <div className="modal__ingredient__delete">
                  <div className="modal__ingredient__delete__none"></div>
                  <MoreButton
                    type="outline"
                    className="modal__ingredient__delete__button"
                  >
                    삭제
                  </MoreButton>
                </div>
              </div>
            ))}
            <div
              className="modal__add modal__size"
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
              onClick={recipeCreate}
            >
              등록
            </MoreButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecipeItemComponent;
