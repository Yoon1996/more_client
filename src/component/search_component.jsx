import React, { useState } from "react";
import "./search_component.scss";
import SearchWordComponent from "./search_word.component";

const SearchComponent = () => {
  const [isSearch, setIsSearch] = useState(false);
  const showSearchWord = () => {};

  const categoryList = ["한식", "양식", "일식", "중식", "야식"];

  return (
    <>
      <div className="search">
        <div className="search__wrap">
          <div className="search__left">레시피 찾기</div>
          <div className="search__right">
            <div
              className="search__input-wrap"
              contentEditable="true"
              placeholder="레시피를 검색해보세요!"
            >
              <SearchWordComponent></SearchWordComponent>
              <div className="search__input"></div>
              {/* <MoreInput
                setIsSearch={setIsSearch}
                showSearchWord={showSearchWord}
                className="search__input"
                placeholder="레시피를 검색해보세요!"
              ></MoreInput> */}
            </div>
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
