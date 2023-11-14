import { DownOutlined, PlusCircleFilled } from "@ant-design/icons";
import { Button, Dropdown, Input, Modal, Space } from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { create } from "../service/recipe.service";
import "./recipe_item.component.scss";

const RecipeItemComponent = () => {
  const [recipeName, setRecipeName] = useState("");

  const navigate = useNavigate();
  const categoryDropItem = useSelector((rootState) => rootState.categoryList);
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

  const items = categoryDropItem.map((category, index) => ({
    label: `${category.name}`,
    key: `${index}`,
  }));

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

  //레시피 등록 이벤트
  const recipeCreate = () => {
    const recipeParam = {
      name: recipeName,
      ingredientList,
      categoryName: changeCategory,
    };

    const errorCheckrRes = recipeValidator(recipeParam);

    if (Object.keys(errorCheckrRes).length) {
      setErrors(errorCheckrRes);
      return;
    }

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
        width={970}
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className="modal__feild">
          <div className="modal__title modal__size">
            <Input
              type="text"
              onChange={(e) => {
                setRecipeName(e.target.value);
              }}
              placeholder="레시피 이름"
            ></Input>
            <div className="modal__hint">
              {errors?.name?.require ? <p>{errors?.name?.require}</p> : ""}
            </div>
          </div>
          <Input type="file"></Input>
          <div className="modal__category modal__size">
            <div>카테고리</div>
            <Dropdown
              menu={{
                items,
                onClick: (params) => {
                  setChangeCategory(`${items[params.key].label}`);
                  console.log(params.key);
                },
              }}
              trigger={["click"]}
            >
              <Space>
                {changeCategory}
                <DownOutlined />
              </Space>
            </Dropdown>
            <div className="modal__hint">
              {errors?.categoryName?.require ? (
                <p>{errors?.categoryName?.require}</p>
              ) : (
                ""
              )}
            </div>
          </div>

          {ingredientList.map((ingredient, index) => (
            <div key={index} className="modal__ingredient modal__size">
              <div className="modal__ingredient__title">
                <div>재료명</div>
                <Input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => ingredientChange(e.target.value, index)}
                  placeholder="재료명 입력"
                ></Input>
              </div>
              <div className="modal__ingredient__ea">
                <div>무게/수량</div>
                <Input
                  type="text"
                  value={ingredient.ea}
                  onChange={(e) => {
                    eaChange(e.target.value, index);
                  }}
                  placeholder="무게/수량 입력"
                ></Input>
              </div>
              <div className="modal__ingredient__unit">
                <div>단위</div>
                <Input
                  type="text"
                  value={ingredient.unit}
                  onChange={(e) => {
                    unitChange(e.target.value, index);
                  }}
                  placeholder="단위 입력"
                ></Input>
              </div>
              <Button className="modal__ingredient__delete_button">
                재료 삭제
              </Button>
            </div>
          ))}

          <Button
            className="modal__add modal__size"
            onClick={() =>
              setIngredientList([
                ...ingredientList,
                { name: "", ea: 0, unit: "" },
              ])
            }
          >
            재료추가
          </Button>
          <div className="modal__util modal__size">
            <Button onClick={handleCancel}>취소</Button>
            <Button onClick={recipeCreate}>등록</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecipeItemComponent;
