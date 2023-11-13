import React from "react";
import MoreButton from "../component/more-button.component";
import { useNavigate } from "react-router-dom";
import "./sub_header.layout.scss";

const SubHeader = ({ isLoginPage, type }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className="sub__header">
        <div className="sub__header-left">
          <img src="/icon/logo.png" alt="" />
        </div>
        <div className={`sub__header-right sub__header-${type}`}>
          {isLoginPage ? (
            <div className="sub__header-message">이미 계정이 있으신가요?</div>
          ) : (
            <div className="sub__header-message">계정이 없으신가요?</div>
          )}
          {isLoginPage ? (
            <MoreButton
              type={"outline"}
              onClick={() => {
                navigate("/login/member_login");
              }}
              className="sub__header-bt"
            >
              로그인
            </MoreButton>
          ) : (
            <MoreButton
              type={"outline"}
              onClick={() => {
                navigate("/login/member_join");
              }}
              className="sub__header-bt"
            >
              회원가입
            </MoreButton>
          )}
        </div>
      </div>
    </>
  );
};

export default SubHeader;
