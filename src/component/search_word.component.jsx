import React, { useEffect, useRef, useState } from "react";
import "./search_word.component.scss";
import { viewCategories } from "../service/category.service";

const SearchWordComponent = ({ type, selectMenu }) => {
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

  const [selectedCategory, setSelectedCategory] = useState(null);

  const onClick = (index) => {
    setSelectedCategory(index);
  };

  return (
    <>
      <div className="search-word__wrap">
        <div onClick={selectMenu} className="search-word">
          {categoryList.map((category, index) => (
            <div
              key={index}
              className={`search-word__category ${
                selectedCategory === index ? "focused" : ""
              }`}
              onClick={() => onClick(index)}
            >
              {category.name}
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
