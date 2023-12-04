import React, { useEffect, useState } from "react";
import "./search_wordList_component.scss";
import SearchWordComponent from "./search_word.component";
import { viewCategories } from "../service/category.service";

const SearchWordListComponent = () => {
  const [categoryList, setCategoryList] = useState([]);
  useEffect(() => {
    viewCategories()
      .then((res) => {
        console.log("res: ", res.data);
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
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
