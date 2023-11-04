import { useGoogleLogin } from "@react-oauth/google";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FindModalComponent from "../component/find_modal.component";
import { emailCheck, loginCheck, socialLogin } from "../service/user.service";
import { loginUser } from "../store/user.store";
import "./login.page.scss";
import MoreButton from "../component/more-button.component";
import MoreInput from "../component/more-input.component";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const onPwHandler = (e) => {
    setPw(e.target.value);
  };

  //에러 메세지 state
  const [errors, setErrors] = useState({});

  //이메일 체크
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const emailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const checkRes = regex.test(newEmail);

    if (checkRes) {
      setErrors({ ...errors, email: null });
    } else {
      setErrors({
        ...errors,
        email: { pattern: "이메일 형식을 확인해주세요." },
      });
    }
  };

  //로그인 핸들러
  const login = () => {
    const LoginParams = {
      email: email,
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
        <div className="login__title">로그인</div>
        <div className="login__form">
          <div className="login__sub-message">
            가입시 등록한 이메일을 입력해주세요.
          </div>
          <MoreInput
            className={
              errors?.email?.pattern
                ? "login__id login__input error"
                : "login__id login__input"
            }
            type="id"
            value={email}
            onChange={emailChange}
          ></MoreInput>
          <div className="more-input__hint">
            {errors?.email?.pattern ? <p>{errors.email.pattern}</p> : ""}
          </div>
          <div className="login__sub-wrap">
            <div className="login__sub-message">
              비밀번호를 입력해주세요.
              <div className="login__find-pw" onClick={showFindModal}>
                비밀번호를 잊으셨나요?
              </div>
            </div>
          </div>

          <MoreInput
            className="login__pw login__input"
            type="password"
            value={pw}
            onChange={onPwHandler}
          ></MoreInput>
          <div className="more-input__hint">
            {errors?.nickname?.errId ? <p>{errors?.nickname?.errId}</p> : ""}
          </div>
          <MoreButton
            type={"fill"}
            className="login__button login__login-button"
            onClick={login}
          >
            로그인
          </MoreButton>
          <div
            className="login__sign"
            onClick={() => navigate("/login/member_join")}
          >
            회원가입
          </div>
          <MoreButton
            className="login__button login__google-login-button"
            onClick={() => googleLogin()}
          >
            <span className="login__google">
              <img src="/google-logo.svg" alt="" />
            </span>
            구글 아이디로 로그인
          </MoreButton>
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
