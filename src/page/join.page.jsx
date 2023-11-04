import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Subject } from "rxjs";
import MoreButton from "../component/more-button.component";
import MoreInput from "../component/more-input.component";
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

  const [nicknameSubject] = useState(() => new Subject());

  //에러메세지
  const [errors, setErrors] = useState({});

  // useEffect(() => {
  //   const sub = nicknameChangeSub();
  //   return () => {
  //     console.log("unsubscribe !!!");
  //     sub.unsubscribe();
  //   };
  // }, []);

  //이메일 체크
  const regex = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const emailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    emailCheck(newEmail)
      .then((res) => {
        if (res.data.isDuplicated === false) {
          //사용 가능한 아이디 표시
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });

    const checkRes = regex.test(newEmail);

    if (checkRes) {
      setErrors({ ...errors, email: null });
    } else {
      setErrors({ ...errors, email: { pattern: "이메일 형식이 아닙니다." } });
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
    } else {
      setErrors({
        ...errors,
        birth: null,
      });
    }
  };

  // const nicknameChangeSub = () => {
  //   return nicknameSubject
  //     .pipe(debounceTime(500), distinctUntilChanged())
  //     .subscribe((newNickname) => {
  //       setNickname(newNickname);
  //       if (!newNickname) {
  //         setErrors({
  //           ...errors,
  //           nickname: { require: "닉네임을 입력해주세요." },
  //         });
  //       } else if (newNickname.length > 20) {
  //         setErrors({
  //           ...errors,
  //           nickname: {
  //             maxLength: "닉네임은 20자 이내로 작성해주세요.",
  //           },
  //         });
  //       } else {
  //         nicknameCheck(newNickname)
  //           .then((res) => {
  //             if (res.data.isDuplicated) {
  //               setErrors({
  //                 ...errors,
  //                 nickname: { duplicated: "중복된 이름입니다." },
  //               });
  //             } else {
  //               setErrors({
  //                 ...errors,
  //                 nickname: { usable: "사용 가능한 이름입니다." },
  //               });
  //             }
  //             console.log("res.data: ", res.data);
  //           })
  //           .catch((errors) => {
  //             console.log("errors: ", errors);
  //           });
  //         console.log("newNickname:", newNickname);
  //       }
  //     });
  // };

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
    } else {
      setErrors({
        ...errors,
        repeatPassword: null,
      });
    }
  }, [pw, rePw]);

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
    <div className="join">
      <div className="join__header">
        <div className="join__header-right">
          <div className="join__header-message">이미 계정이 있으신가요?</div>
          <MoreButton
            type={"outline"}
            onClick={() => {
              navigate("/login/member_login");
            }}
            className="join__header-bt"
          >
            로그인
          </MoreButton>
        </div>
      </div>
      <div className="join__content">
        <div className="join__title">모두의 레시피에 오신 것을 환영합니다!</div>
        <div className="join__form">
          {/* <div className="join__id join__box">
            <div className="join__id_sub">사용할 아이디를 입력해주세요.</div>
            <MoreInput
              id="join__id"
              type="text"
              defaultValue={nickname}
              onChange={(event) => {
                nicknameSubject.next(event.target.value);
              }}
            ></MoreInput>
            <div className="hint">
              {errors?.nickname?.require ? (
                <p>{errors?.nickname?.require}</p>
              ) : (
                ""
              )}
              {errors?.nickname?.maxLength ? (
                <p>{errors?.nickname?.maxLength}</p>
              ) : (
                ""
              )}
            </div>
            <div className="hint hint__duplicated">
              {errors?.nickname?.duplicated ? (
                <p>{errors?.nickname?.duplicated}</p>
              ) : (
                ""
              )}
            </div>
            <div className="hint hint__usable">
              {errors?.nickname?.usable ? (
                <p>{errors?.nickname?.usable}</p>
              ) : (
                ""
              )}
            </div>
          </div> */}
          <div className="join__email join__box">
            <div className="join__email_sub">
              아이디로 사용할 이메일을 입력해주세요.
            </div>
            <MoreInput
              id="join__email"
              type="text"
              value={email}
              onChange={emailChange}
            ></MoreInput>
            <div className="hint">
              {errors?.email?.pattern ? <p>{errors.email.pattern}</p> : ""}
            </div>
          </div>
          <div className="join__pw join__box">
            <div className="join__pw_sub">비밀번호를 입력해주세요.</div>
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
            <div className="join__pw_sub">
              비밀번호를 다시 한번 입력 해주세요.
            </div>
            <MoreInput
              id="join__pw_again"
              type="password"
              value={rePw}
              onChange={(event) => {
                setRePw(event.target.value);
              }}
            ></MoreInput>
            <div className="hint">
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
            <div className="join__name_sub">이름을 입력해주세요.</div>
            <MoreInput
              type="text"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            ></MoreInput>
          </div>
          <div className="join__birth join__box">
            <div className="join__birth_sub">
              생년월일 8자리를 입력해주세요.
            </div>
            <MoreInput
              type="text"
              value={birth}
              onChange={birthCheck}
            ></MoreInput>
            <div className="hint">
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
  );
};

export default JoinPage;
