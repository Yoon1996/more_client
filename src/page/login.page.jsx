import { useGoogleLogin } from "@react-oauth/google";
import { Button, Input } from "antd";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FindModalComponent from "../component/find_modal.component";
import { loginCheck, socialLogin } from "../service/user.service";
import { loginUser } from "../store/user.store";
import "./login.page.scss";

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");

  const onIdHandler = (e) => {
    setNickname(e.target.value);
  };

  const onPwHandler = (e) => {
    setPw(e.target.value);
  };

  //에러 메세지 state
  const [errors, setErrors] = useState({});

  //로그인 핸들러
  const login = () => {
    const LoginParams = {
      nickname: nickname,
      password: pw,
    };

    loginCheck(LoginParams)
      .then(function (response) {
        console.log("성공", response);
        dispatch(loginUser(response.data));
        alert(`${response.data.nickname}님 환영합니다!`);
        navigate("/");
      })
      .catch(function (error) {
        // 오류발생시 실행
        console.log("실패", error);
        setErrors({
          ...errors,
          nickname: {
            errId:
              "ID 혹은 비밀번호를 잘못 입력하셨거나 등록되지 않은 ID 입니다.",
          },
        });
      });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showFindModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      socialLogin(tokenResponse)
        .then((res) => {
          console.log("res: ", res.data);
          dispatch(loginUser(res.data));
          navigate("/");
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    },
    onError: (errorResponse) => {
      console.log("errorResponse: ", errorResponse);
    },
    flow: "auth-code",
  });

  return (
    <div className="login-page">
      <div className="login-page__content">
        <div id="login">
          <div id="login__title">모두의 레시피에 오신 것을 환영합니다!</div>
          <div id="login__form">
            <div className="hint">
              {errors?.nickname?.errId ? <p>{errors?.nickname?.errId}</p> : ""}
            </div>
            <Input
              id="login__id"
              type="id"
              value={nickname}
              onChange={onIdHandler}
              placeholder="아이디를 입력해주세요."
            />
            <Input
              id="login__pw"
              type="password"
              value={pw}
              onChange={onPwHandler}
              placeholder="비밀번호를 입력해주세요."
            />
            <Button onClick={login}>로그인</Button>
            <Button onClick={showFindModal} type="link" id="login_search">
              아이디, 비밀번호 찾기
            </Button>
            {/* <GoogleLoginButtonComponent></GoogleLoginButtonComponent> */}
            <Button onClick={() => googleLogin()}>
              구글 아이디로 로그인하기
            </Button>
            <Button onClick={() => navigate("/login/member_join")}>
              회원가입
            </Button>
          </div>
        </div>
      </div>
      <FindModalComponent
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
      ></FindModalComponent>
    </div>
  );
};

export default LoginPage;
