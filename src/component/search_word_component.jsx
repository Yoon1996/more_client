import React from "react";
import "./search_word_component.scss";

const SearchWordComponent = () => {
  const categoryList = [
    "한식",
    "양식",
    "일식",
    "중식",
    "야식",
    "간식",
    "제빵",
    "기타",
  ];
  return (
    <>
      <div className="search-word">
        <div className="search-word__wrap">
          {categoryList.map((category) => (
            <div className="search-word__category">{category}</div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchWordComponent;
