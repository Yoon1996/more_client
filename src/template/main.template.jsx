import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLayout from "../layout/header.layout";
import "./main.template.scss";

const MainTemplate = () => {
  return (
    <>
      <HeaderLayout isMyAccount={false} />
      <main>
        <div className="main__layout">
          <Outlet></Outlet>
        </div>
      </main>
    </>
  );
};

export default MainTemplate;
