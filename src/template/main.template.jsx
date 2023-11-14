import React from "react";
import { Outlet } from "react-router-dom";
import HeaderLayout from "../layout/header.layout";

const MainTemplate = () => {
  return (
    <>
      <HeaderLayout isMyAccount={false} />
      <main>
        <div className="main__content">
          <div className="main__layout">
            <Outlet></Outlet>
          </div>
        </div>
      </main>
    </>
  );
};

export default MainTemplate;
