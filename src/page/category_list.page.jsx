import { Button, Col, Input } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { create } from "../service/recipe.service";
import "./category_list.page.scss";
import {
  categoryCreate,
  categoryDelete,
  viewCategories,
} from "../service/category.service";
import { configConsumerProps } from "antd/es/config-provider";
import { useDispatch, useSelector } from "react-redux";
import { updateCategory } from "../store/category.store";

const CategoryListpage = () => {
  const [category, setCategoryList] = useState("");
  // const [viewCategoryList, setViewCategoryList] = useState([]);

  const categoryInputHandler = (e) => {
    setCategoryList(e.target.value);
  };

  //카테고리 dispatch
  const dispatch = useDispatch();
  const viewCategoryList = useSelector((rootState) => rootState.categoryList);

  //카테고리 등록 이벤트
  const CategoryCreateHandler = () => {
    const categoryParams = {
      category,
    };

    categoryCreate(categoryParams)
      .then(function (res) {
        if (res.data.isEmpty) {
          alert("카테고리가 입력되지 않았습니다. 카테고리를 입력해주세요!");
        } else {
          if (res.data.isDuplicated) {
            alert("중복된 이름 입니다! 다른 카테고리명을 입력하세요!");
          } else {
            // setViewCategoryList(res.data);
            dispatch(updateCategory(res.data));
          }
        }
      })
      .catch(function (err) {
        console.log("err: ", err);
      });
  };

  //카테고리 보여주기
  useEffect(() => {
    viewCategories()
      .then(function (res) {
        // setViewCategoryList(res.data);
        dispatch(updateCategory(res.data));
      })
      .catch(function (err) {
        console.log("카테고리페이지get에러:", err);
      });
  }, []);

  //카테고리 삭제 이벤트
  const CategoryDeleteHandler = (categoryId) => {
    categoryDelete(categoryId)
      .then(function (res) {
        if (res.data.isInclude) {
          alert("카테고리에 포함되어 있는 레시피가 있습니다.");
        } else {
          alert("삭제되었습니다.");
          dispatch(updateCategory(res.data));
        }
      })
      .catch(function (err) {
        console.log("삭제실패err: ", err);
      });
  };

  return (
    <>
      <Col>
        <div className="category">
          <div className="main__title">카테고리 관리</div>
          <div className="category__view">
            {viewCategoryList.map((category) => (
              <div className="category__viewContent" key={category.id}>
                {category.name}
                <Button
                  onClick={() => {
                    CategoryDeleteHandler(category.id);
                  }}
                  className="category__delete"
                >
                  삭제
                </Button>
              </div>
            ))}
          </div>

          <Input
            className="category__input"
            type="text"
            value={category}
            onChange={categoryInputHandler}
            placeholder="추가 할 카테고리 입력"
          ></Input>
          <div className="category__field"></div>
          <Button className="category__save" onClick={CategoryCreateHandler}>
            저장하기
          </Button>
        </div>
      </Col>
      <Outlet></Outlet>
    </>
  );
};

export default CategoryListpage;
