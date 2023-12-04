import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useState, Link } from "react";
import MyInfoPage from "../page/my_info.page";
import { useNavigate } from "react-router-dom";
import "./sidebar.component.scss";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

const items = [
  getItem("내 정보", "/my-account/my_info_page", []),
  getItem("카테고리 관리", "/my-account/category_list_page", []),
  getItem("탈퇴하기", "/my-account/withdraw_page", []),
];

const SidebarComponent = () => {
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
        <div onClick={goMyinfo} className="sidebar__menu">
          내 정보
        </div>
        <div onClick={goCategory} className="sidebar__menu">
          카테고리 관리
        </div>
        <div onClick={goWithdraw} className="sidebar__menu">
          회원 탈퇴
        </div>
      </div>
    </>
  );
};

export default SidebarComponent;
