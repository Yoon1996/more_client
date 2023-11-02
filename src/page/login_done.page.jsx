import React from "react";
import "./login_done.page.scss";
import ConfettiComponent from "../component/confetti_component";
import { useSelector } from "react-redux";

const LoginDonePage = () => {
  const user = useSelector((rootState) => rootState.user);
  console.log("user: ", user);

  return (
    <>
      <div className="login-done">
        <div>환영합니다!</div>
        <div>{user.nickname}님만의 레시피를 저장해보세요!</div>
      </div>
      <ConfettiComponent></ConfettiComponent>
    </>
  );
};

export default LoginDonePage;
