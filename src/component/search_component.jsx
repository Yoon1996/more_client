import React, { useEffect, useRef, useState } from "react";
import MoreInput from "./more-input.component";
import "./search_component.scss";
import SearchWordComponent from "./search_word_component";

const SearchComponent = () => {
  const [isSearch, setIsSearch] = useState(false);
  const showSearchWord = () => {
    setIsSearch(true);
  };
  const inputRef = useRef();

  console.log(inputRef.current.focus());

  return (
    <>
      <div className="search">
        <div className="search__wrap">
          <div className="search__left">레시피 찾기</div>
          <div className="search__right">
            <MoreInput
              onClick={showSearchWord}
              className="search__input"
              placeholder="레시피를 검색해보세요!"
            ></MoreInput>
            <div className="search__icon">
              <img src="/icon/search.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
      {isSearch ? <SearchWordComponent></SearchWordComponent> : null}
    </>
  );
};

export default SearchComponent;
