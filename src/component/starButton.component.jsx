import React, { useState } from "react";
import { bookmarkCreate, bookmarkDelete } from "../service/bookmark.service";
import "./starButton.component.scss";

const StarButton = ({ value }) => {
  //북마크 로고 변경
  const [isBookmark, setIsBookmark] = useState(false);
  //북마크 등록하기
  const registBookmark = (id) => {
    const params = {
      recipeId: id,
    };
    console.log("params: ", params);
    bookmarkCreate(params)
      .then((res) => {
        console.log("res: ", res);
        console.log("지정");
        setIsBookmark(true);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //북마크 해제하기
  const deleteBookmark = (id) => {
    bookmarkDelete(id)
      .then((res) => {
        console.log("res: ", res);
        setIsBookmark(false);
        console.log("삭제");
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <>
      <div
        className="star-button"
        onClick={() =>
          isBookmark ? deleteBookmark(value) : registBookmark(value)
        }
      >
        <img
          src={isBookmark ? `/icon/bookmark.svg` : `/icon/bookmark-outline.svg`}
          alt=""
        />
      </div>
    </>
  );
};

export default StarButton;
