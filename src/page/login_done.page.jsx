import React from "react";
import "./login_done.page.scss";
import ConfettiComponent from "../component/confetti_component";
import { useSelector } from "react-redux";
import SubHeader from "../layout/sub_header.layout";

const LoginDonePage = () => {
  const user = useSelector((rootState) => rootState.user);
  console.log("user: ", user);

  return (
    <>
      <div className="login-done">
        <SubHeader type="none"></SubHeader>
        <div className="login-done__content">
          <div className="login-done__logo">
            <img className="login-done__logo_img" src="/icon/logo.png" alt="" />
          </div>
          <div className="login-done__message">
            <div>환영합니다!</div>
            <div>{user.name}님만의 레시피를 저장해보세요!</div>
          </div>
        </div>
      </div>

      <ConfettiComponent></ConfettiComponent>
    </>
  );
};

export default LoginDonePage;
