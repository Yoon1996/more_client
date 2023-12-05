import React, { useEffect, useState } from "react";
import HeaderLayout from "../layout/header.layout";
import { Outlet } from "react-router-dom";
import { Col, Row } from "antd";
import SidebarComponent from "../component/sidebar.component";
import "./my-account.template.scss";

const MyAccountTemplate = () => {
  const [title, setTitle] = useState("내 정보");
  const changeTitle = (e) => {
    const clikedValue = e.target.innerText;
    console.log("clikedValue: ", clikedValue);
    setTitle(clikedValue);
  };
  return (
    <>
      <HeaderLayout isMyAccount={false} />
      <main>
        <div className="my-account">
          <div className="my-account__title">{title}</div>
          <div className="my-account__layout">
            <div className="my-account__sidebar">
              <SidebarComponent changeTitle={changeTitle}></SidebarComponent>
            </div>
            <div className="my-account__content">
              <Outlet></Outlet>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default MyAccountTemplate;
