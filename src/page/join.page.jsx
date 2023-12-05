import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Subject } from "rxjs";
import MoreButton from "../component/more-button.component";
import MoreInput from "../component/more-input.component";
import SubHeader from "../layout/sub_header.layout";
import { emailCheck, signUp } from "../service/user.service";
import "./join.page.scss";

const JoinPage = () => {
  const navigate = useNavigate();

  //초기값 세팅
  const [nickname, setNickname] = useState("");
  const [pw, setPw] = useState("");
  const [rePw, setRePw] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [birth, setbirth] = useState("");

  //이미지 보이기
  const [showCheckEmail, setShowCheckEmail] = useState(false);
  const [showCheckPw, setShowCheckPw] = useState(false);
  const [showCheckName, setShowCheckName] = useState(false);
  const [showCheckBirth, setShowCheckBirth] = useState(false);

  //subHeader 버튼 변경
  const [isLoginPage, setIsLoginPage] = useState(true);

  //이메일 중복 여부
  const [duplicatedEmail, setDuplicatedEmail] = useState(false);

  const [nicknameSubject] = useState(() => new Subject());

  //에러메세지
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
      emailCheck(newEmail)
        .then((res) => {
          if (res.data.isDuplicated === true) {
            setShowCheckEmail(false);
            setDuplicatedEmail(true);
          } else {
            setShowCheckEmail(true);
            setDuplicatedEmail(false);
          }
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    } else {
      setErrors({ ...errors, email: { pattern: "이메일 형식이 아닙니다." } });
      setShowCheckEmail(false);
    }
  };

  //생년월일 체크
  const birthCheck = (event) => {
    const newBirth = event.target.value;
    setbirth(newBirth);

    if (newBirth.length > 8 || newBirth.length < 8) {
      setErrors({
        ...errors,
        birth: { eight: "생년월일은 8자로 입력해주세요." },
      });
      setShowCheckBirth(false);
    } else {
      setErrors({
        ...errors,
        birth: null,
      });
      setShowCheckBirth(true);
    }
  };

  //비밀번호 체크
  useEffect(() => {
    if (!pw) {
      setErrors({
        ...errors,
        password: { require: "비밀번호를 입력해주세요." },
      });
    }
    if (!rePw) {
      setErrors({
        ...errors,
        repeatPassword: "비밀번호를 입력해주세요.",
      });
    }
    if (pw && rePw && pw !== rePw) {
      setErrors({
        ...errors,
        repeatPassword: { duplicated: "비밀번호가 일치하지 않습니다." },
      });
      setShowCheckPw(false);
    } else {
      setErrors({
        ...errors,
        repeatPassword: null,
      });
      setShowCheckPw(true);
      if (rePw.length === 0) {
        setShowCheckPw(false);
      }
    }
  }, [pw, rePw]);

  //이름체크
  let n_RegExp = /^[가-힣]{2,15}$/;

  const nameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
    if (newName.value === "") {
      setShowCheckName(false);
    } else if (!n_RegExp.test(newName.value)) {
      setShowCheckName(false);
    } else {
      setShowCheckName(true);
    }
  };

  //회원가입 요청
  const register = () => {
    const signUpParams = {
      nickname: nickname,
      password: pw,
      email: email,
      name: name,
      birth: birth,
    };

    if (
      !errors?.password?.require &&
      !errors?.repeatPassword?.duplicated &&
      !errors?.email?.pattern &&
      !errors?.birth?.eight &&
      signUpParams
    ) {
      signUp(signUpParams)
        .then(function (response) {
          console.log("성공", response);
          alert(`${nickname}환영합니다!`);
          navigate("/login/member_login");
          // response
        })
        .catch(function (error) {
          // 오류발생시 실행
          console.log("실패", error);
        })
        .then(function () {
          // 항상 실행
          console.log("데이터 요청 완료");
        });
    } else {
      alert("다시한번 확인해주세요");
    }
  };

  return (
    <>
      <div className="join">
        <SubHeader isLoginPage={isLoginPage}></SubHeader>
        <div className="join__content">
          <div className="join__title">모두의 레시피 회원가입</div>
          <div className="join__form">
            <div className="join__email join__box">
              <div className="join__email_sub join__sub">
                아이디로 사용할 이메일을 입력해주세요.
              </div>
              <MoreInput
                className={`join__email__sub" ${
                  errors?.email?.pattern || duplicatedEmail
                    ? "error"
                    : email.length === 0
                    ? ""
                    : "success"
                }`}
                id="join__email"
                type="text"
                value={email}
                onChange={emailChange}
                showCheck={showCheckEmail}
              ></MoreInput>
              <div className="more-input__hint">
                {errors?.email?.pattern ? <p>{errors.email.pattern}</p> : ""}
              </div>
            </div>
            <div className="join__pw join__box">
              <div className="join__pw_sub join__sub">
                비밀번호를 입력해주세요.
              </div>
              <MoreInput
                id="join__pw"
                type="password"
                value={pw}
                onChange={(event) => {
                  setPw(event.target.value);
                }}
              ></MoreInput>
              <div className="hint">
                {errors?.password?.require ? (
                  <p>{errors.Password.require}</p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="join__pw_again join__box">
              <div className="join__pw_sub join__sub">
                비밀번호를 다시 한번 입력 해주세요.
              </div>
              <MoreInput
                className={
                  errors?.repeatPassword?.duplicated ? "error" : "success"
                }
                id="join__pw_again"
                type="password"
                value={rePw}
                onChange={(event) => {
                  setRePw(event.target.value);
                }}
                showCheck={showCheckPw}
              ></MoreInput>
              <div className="more-input__hint">
                {errors?.repeatPassword?.duplicated ? (
                  <p>{errors.repeatPassword.duplicated}</p>
                ) : (
                  ""
                )}
                {errors?.repeatPassword?.require ? (
                  <p>{errors.repeatPassword.require}</p>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="join__name join__box">
              <div className="join__name_sub join__sub">
                이름을 입력해주세요.
              </div>
              <MoreInput
                type="text"
                value={name}
                onChange={nameChange}
                showCheck={showCheckName}
              ></MoreInput>
            </div>
            <div className="join__birth join__box">
              <div className="join__birth_sub join__sub">
                생년월일 8자리를 입력해주세요.
              </div>
              <MoreInput
                className={errors?.birth?.eight ? "error" : "success"}
                type="text"
                value={birth}
                onChange={birthCheck}
                showCheck={showCheckBirth}
              ></MoreInput>
              <div className="more-input__hint">
                {errors?.birth?.eight ? <p>{errors.birth.eight}</p> : ""}
              </div>
            </div>
            <MoreButton
              type={"fill"}
              className="join__button"
              onClick={() => register()}
            >
              회원가입
            </MoreButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default JoinPage;
