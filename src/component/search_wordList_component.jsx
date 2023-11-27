import React from "react";
import "./search_wordList_component.scss";
import SearchWordComponent from "./search_word.component";

const SearchWordListComponent = () => {
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
            <SearchWordComponent className="search-word__category">
              {category}
            </SearchWordComponent>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchWordListComponent;
