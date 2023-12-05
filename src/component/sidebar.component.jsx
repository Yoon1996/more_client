import React from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar.component.scss";

const SidebarComponent = ({ changeTitle }) => {
  const navigate = useNavigate();

  const goMyinfo = () => {
    navigate("/my-account/my_info_page");
  };

  const goCategory = () => {
    navigate("/my-account/category_list_page");
  };

  const goWithdraw = () => {
    navigate("/my-account/withdraw_page");
  };

  return (
    <>
      <div className="sidebar">
        <div
          onClick={(e) => {
            goMyinfo();
            changeTitle(e);
          }}
          className="sidebar__menu"
        >
          내 정보
        </div>
        <div
          onClick={(e) => {
            goCategory();
            changeTitle(e);
          }}
          className="sidebar__menu"
        >
          카테고리 관리
        </div>
        <div
          onClick={(e) => {
            goWithdraw();
            changeTitle(e);
          }}
          className="sidebar__menu"
        >
          회원 탈퇴
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;
