import { UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfoDropComponent from "../component/info_drop.component";
import { viewCategories } from "../service/category.service";
import { updateCategory } from "../store/category.store";
import { logoutUser } from "../store/user.store";
import "./header.layout.scss";

const HeaderLayout = ({ isMyAccount }) => {
  // const [viewCategoryList, setViewCategoryList] = useState([]);
  const user = useSelector((rootState) => rootState.user);
  const viewCategoryList = useSelector((rootState) => rootState.categoryList);

  const recipies = useSelector((rootState) => rootState.recipe);
  const dispatch = useDispatch();

  //카테고리 보여주기
  useEffect(() => {
    viewCategories()
      .then(function (res) {
        dispatch(updateCategory(res.data));
      })
      .catch(function (err) {
        console.log("HeaderGet에러:", err);
      });
  }, []);

  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);

  //홈으로 이동
  const goHome = () => {
    navigate("/");
  };

  //카테고리 관리 이동
  const goCategory = () => {
    navigate("/my-account/category_list_page");
  };

  const openInfoDrop = () => {
    setIsVisible(!isVisible);
  };

  return (
    <header className="header">
      <div className="header__wrap">
        <div className="header__logo">
          <img src="/icon/logo.png" alt="" />
        </div>
        <div className="header__title" onClick={() => navigate("/")}>
          <img src="/icon/logo_typo.png" alt="" />
        </div>
        <div className="header__info">
          <div className="header__info--group">
            {user.id ? (
              <>
                <div className="header__info--user">
                  <div className="header__info--userName">{user.name}</div>님
                  환영합니다
                  <div className="header__info--drop">
                    {isVisible ? <InfoDropComponent></InfoDropComponent> : ""}
                  </div>
                </div>
                <div className="header__info--user-img" onClick={openInfoDrop}>
                  <img src="/icon/header-profile.svg" alt="" />
                </div>
              </>
            ) : (
              <>
                <div
                  onClick={() => navigate("/login/member_login")}
                  className="header__info--login"
                >
                  <UserOutlined />
                  로그인
                </div>
                <div
                  onClick={() => navigate("/login/member_join")}
                  className="header__info--sign"
                >
                  회원가입
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      {/* <div className="header__logo">
        <div onClick={goHome} className="header__logo--title">
          모두의 레시피
        </div>
      </div> */}
      {/* {!isMyAccount && (
        <div className="header__nav">
          <ul>
            <li onClick={goCategory}>카테고리관리</li>
          </ul>
        </div>
      )} */}
    </header>
  );
};

export default HeaderLayout;

//dhfb
