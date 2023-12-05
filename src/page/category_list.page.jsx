import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MoreButton from "../component/more-button.component";
import MoreInput from "../component/more-input.component";
import {
  categoryCreate,
  categoryDelete,
  viewCategories,
} from "../service/category.service";
import { updateCategory } from "../store/category.store";
import "./category_list.page.scss";

const CategoryListpage = () => {
  const [category, setCategoryList] = useState("");

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
            setIsCorrect(true);
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

  //카테고리 저장 메세지
  const [isCorrect, setIsCorrect] = useState(false);

  return (
    <>
      <div className="category">
        <div className="category__upper">
          <div className="category__upper__content">
            <div className="category__title">카테고리</div>
            <div className="category__view">
              {viewCategoryList.map((category) => (
                <div className="category__viewContent" key={category.id}>
                  <div className="category__name">{category.name}</div>
                  <div
                    onClick={() => {
                      CategoryDeleteHandler(category.id);
                    }}
                    className="category__delete"
                  >
                    <img src="/icon/cancel.svg" alt="" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="category__upper__input">
            <MoreInput
              className="category__input"
              type="text"
              value={category}
              onChange={categoryInputHandler}
              placeholder="카테고리를 입력해주세요!"
            ></MoreInput>
          </div>
        </div>
        <div className="category__under">
          {isCorrect ? (
            <div className="category__correct">
              <div>카테고리가 성공적으로 변경되었습니다!</div>
              <div>
                <img src="/icon/arrow-done.svg" alt="" />
              </div>
            </div>
          ) : null}
          <MoreButton
            type="fill"
            className="category__button"
            onClick={CategoryCreateHandler}
          >
            저장하기
          </MoreButton>
        </div>
      </div>
    </>
  );
};

export default CategoryListpage;
