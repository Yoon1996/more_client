import React, { useState } from "react";
import MoreInput from "./more-input.component";
import "./search_component.scss";
import { getSearchRecipeList } from "../service/recipe.service";

const SearchComponent = () => {
  const [inputText, setInputText] = useState("");
  const getText = (e) => {
    setInputText(e.target.value);
    console.log(inputText);
  };

  const search = () => {
    getSearchRecipeList(inputText)
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };
  return (
    <>
      <div className="search">
        <div className="search__wrap">
          <div className="search__left">레시피 찾기</div>
          <div className="search__right">
            <MoreInput
              className="search__input-wrap"
              placeholder="레시피를 검색해보세요!"
              value={inputText}
              getText={getText}
            ></MoreInput>
            <div onClick={search} className="search__icon">
              <img src="/icon/search.svg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
