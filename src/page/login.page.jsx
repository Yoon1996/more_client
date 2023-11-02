import { useGoogleLogin } from "@react-oauth/google";
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
        navigate("/login/member_login-done");
        setTimeout(() => {
          navigate("/");
        }, 3000);
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
          navigate("/login/member_login-done");
          setTimeout(() => {
            navigate("/");
          }, 3000);
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
    <div className="login">
      <div className="login__content">
        <div className="login__title">
          모두의 레시피에 오신 것을 환영합니다!
        </div>
        <div className="login__form">
          <div className="login__sub-message">
            가입시 등록한 이메일을 입력해주세요.
          </div>
          <input
            className="login__id login__input"
            type="id"
            value={nickname}
            onChange={onIdHandler}
          ></input>
          <div className="login__sub-message">
            비밀번호를 입력해주세요.
            <div className="login__find-pw" onClick={showFindModal}>
              비밀번호를 잊으셨나요?
            </div>
          </div>

          <input
            className="login__pw login__input"
            type="password"
            value={pw}
            onChange={onPwHandler}
          ></input>
          <div className="hint">
            {errors?.nickname?.errId ? <p>{errors?.nickname?.errId}</p> : ""}
          </div>
          <button className="login__button login__login-button" onClick={login}>
            로그인
          </button>
          <div
            className="login__sign"
            onClick={() => navigate("/login/member_join")}
          >
            회원가입
          </div>
          <button
            className="login__button login__google-login-button"
            onClick={() => googleLogin()}
          >
            <span className="login__google">
              <img src="/google-logo.png" alt="" />
            </span>
            구글 아이디로 로그인
          </button>
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
