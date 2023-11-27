import { DownOutlined } from "@ant-design/icons";
import { Button, Dropdown, Input, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRecipe, editRecipe, getRecipe } from "../service/recipe.service";
import { setRecipes } from "../store/recipe.store";
import "./recipe_list_modal.component.scss";

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
  const deleteRecipeMode = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteRecipe(id)
        .then((res) => {
          dispatch(setRecipes(res.data));
          handleCancel();
        })
        .catch((err) => {
          console.log("err: ", err);
        });
      alert("삭제되었습니다.");
    } else {
      alert("취소되었습니다.");
    }
  };

  const items = categoryDropItem.map((category, index) => ({
    label: `${category.name}`,
    key: `${index}`,
  }));

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
      <Modal
        className="modal"
        width={970}
        title=""
        open={isModalOpen}
        onCancel={handleCancel}
      >
        <div className="modal__feild">
          <div className="modal__title modal__size">
            {isEditMode ? (
              //입력모드일때
              <div>
                <Input
                  type="text"
                  defaultValue={recipeName}
                  onChange={(e) => setRecipeName(e.target.value)}
                ></Input>
              </div>
            ) : (
              //표시 모드일때
              <div>
                <div>{recipeName}</div>
              </div>
            )}
          </div>
          <div className="modal__category modal__size">
            <div>카테고리</div>
            {isEditMode ? (
              <Dropdown
                menu={{
                  items,
                  onClick: (params) => {
                    setChangeCategory(`${items[params.key].label}`);
                  },
                }}
                trigger={["click"]}
              >
                <Space>
                  {changeCategory ? changeCategory : changeCategory}
                  <DownOutlined />
                </Space>
              </Dropdown>
            ) : (
              <Space>{changeCategory}</Space>
            )}
          </div>
          {ingredientList.map((ingredient, index) => (
            <div key={index} className="modal__ingredient modal__size">
              <div className="modal__ingredient__title">
                <div>재료명</div>
                {isEditMode ? (
                  //입력모드일때
                  <div>
                    <Input
                      type="text"
                      defaultValue={ingredient.name}
                      onChange={(e) => ingredientChange(e.target.value, index)}
                    ></Input>
                  </div>
                ) : (
                  //표시 모드일때
                  <div>
                    <div>{ingredient.name}</div>
                  </div>
                )}
              </div>
              <div className="modal__ingredient__ea">
                <div>무게/수량</div>
                {isEditMode ? (
                  //입력모드일때
                  <div>
                    <Input
                      type="text"
                      defaultValue={ingredient.ea}
                      onChange={(e) => {
                        eaChange(e.target.value, index);
                      }}
                    ></Input>
                  </div>
                ) : (
                  //표시 모드일때
                  <div>
                    <div>{ingredient.ea}</div>
                  </div>
                )}
              </div>
              <div className="modal__ingredient__unit">
                <div>단위</div>
                {isEditMode ? (
                  //입력모드일때
                  <div>
                    <Input
                      type="text"
                      defaultValue={ingredient.unit}
                      onChange={(e) => {
                        unitChange(e.target.value, index);
                      }}
                    ></Input>
                  </div>
                ) : (
                  //표시 모드일때
                  <div>
                    <div>{ingredient.unit}</div>
                  </div>
                )}
              </div>
              {isEditMode ? (
                <Button className="modal__ingredient__delete_button">
                  재료 삭제
                </Button>
              ) : (
                ""
              )}
            </div>
          ))}
          <div className="modal__util modal__size">
            <Button onClick={handleCancel}>취소</Button>
            {isEditMode ? (
              <Button onClick={() => submit(recipes.recipeId)}>저장</Button>
            ) : (
              <>
                <Button onClick={enableEditMode}>수정</Button>
                <Button onClick={() => deleteRecipeMode(recipes.recipeId)}>
                  삭제
                </Button>
              </>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default RecipeListModalComponent;
