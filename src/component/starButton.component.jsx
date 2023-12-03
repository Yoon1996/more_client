import React, { useEffect, useState } from "react";
import {
  bookmarkCreate,
  bookmarkDelete,
  bookmarkToggle,
} from "../service/bookmark.service";
import "./starButton.component.scss";
import { useDispatch } from "react-redux";
import { setRecipes } from "../store/recipe.store";
import { getRecipeList } from "../service/recipe.service";

const StarButton = ({ recipe, loadRecipeList }) => {
  //북마크 로고 변경
  const [isBookmark, setIsBookmark] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {}, []);
  //북마크 등록하기
  const registBookmark = (id) => {
    const params = {
      recipeId: id,
    };
    console.log("params: ", params);
    bookmarkToggle(params)
      .then((res) => {
        console.log("res: ", res);
        loadRecipeList();
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //북마크 해제하기
  // const deleteBookmark = (id) => {
  //   bookmarkDelete(id)
  //     .then((res) => {
  //       console.log("res: ", res);
  //       console.log("삭제");
  //     })
  //     .catch((err) => {
  //       console.log("err: ", err);
  //     });
  // };
  return (
    <>
      <div className="star-button" onClick={() => registBookmark(recipe.id)}>
        <img
          src={
            recipe?.Bookmarks?.length
              ? `/icon/bookmark.svg`
              : `/icon/bookmark-outline.svg`
          }
          alt=""
        />
      </div>
    </>
  );
};

export default StarButton;
