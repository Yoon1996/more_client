import React from "react";
import HeaderLayout from "../layout/header.layout";
import { Outlet } from "react-router-dom";
import { Col, Row } from "antd";
import SidebarComponent from "../component/sidebar.component";
import "./my-account.template.scss";

const MyAccountTemplate = () => {
  return (
    <>
      <HeaderLayout isMyAccount={false} />
      <main>
        <div className="my-account">
          <div className="my-account__layout">
            <div className="my-account__sidebar">
              <SidebarComponent></SidebarComponent>
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
