import React, { useState } from "react";
import MoreInput from "./more-input.component";
import "./search_component.scss";
import { getSearchRecipeList } from "../service/recipe.service";
import { useDispatch } from "react-redux";
import { setRecipes } from "../store/recipe.store";

const SearchComponent = () => {
  const [inputText, setInputText] = useState("");
  const [searchError, setSearchError] = useState({});
  const dispatch = useDispatch();
  const getText = (e) => {
    setInputText(e.target.value);
  };

  const search = () => {
    console.log(inputText);
    getSearchRecipeList(inputText)
      .then((res) => {
        console.log("res: ", res);
        setSearchError({
          ...searchError,
          least: null,
        });
        dispatch(setRecipes(res.data));
      })
      .catch((err) => {
        console.log("err: ", err);
        const atLeastTwo = err.response.data.statusMessage;
        if (atLeastTwo) {
          setSearchError({
            ...searchError,
            least: { require: "검색어는 두글자 이상 입력해주세요." },
          });
        } else {
        }
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
            <div className="search__hint">
              {searchError?.least?.require ? searchError?.least?.require : ""}
            </div>
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
