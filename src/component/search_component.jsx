import React from "react";
import MoreInput from "./more-input.component";
import "./search_component.scss";

const SearchComponent = () => {
  return (
    <>
      <div className="search">
        <div className="search__wrap">
          <div className="search__left">레시피 찾기</div>
          <div className="search__right">
            <MoreInput
              className="search__input"
              placeholder="레시피를 검색해보세요!"
            ></MoreInput>
            <div className="search__icon">
              <img src="/icon/search.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
