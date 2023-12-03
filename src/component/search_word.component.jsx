import React from "react";
import "./search_word.component.scss";

const SearchWordComponent = ({ type }) => {
  const categoryList = ["한식", "양식", "일식", "중식"];
  return (
    <>
      <div className="search-word__wrap">
        <div className="search-word">
          {categoryList.map((category, index) => (
            <div className="search-word__category">
              {category}
              {type ? null : (
                <div className="search-word__close">
                  <img src="/icon/close.svg" alt="" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SearchWordComponent;
