import React from "react";
import HeaderLayout from "../layout/header.layout";
import { Outlet } from "react-router-dom";
import { Col, Row } from "antd";

const MainTemplate = () => {
  return (
    <>
      <HeaderLayout isMyAccount={false} />
      <main>
        <div className="main__content">
          <Row className="main__layout">
            <Outlet></Outlet>
          </Row>
        </div>
      </main>
    </>
  );
};

export default MainTemplate;
