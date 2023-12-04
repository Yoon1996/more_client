import { Button, Col, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordCheckModal from "../component/password_check.modal";
import { infoUpdate } from "../service/user.service";
import { updateUser } from "../store/user.store";
import "./my_info.page.scss";

const MyInfoPage = () => {
  const user = useSelector((rootState) => rootState.user);
  console.log("user: ", user);

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user.name,
    nickname: user.nickname,
    password: user.password,
    email: user.email,
    birth: user.birth,
  });

  const [errors, setErrors] = useState({});

  //닉네임 체크
  // const [nicknameSubject] = useState(() => new Subject());

  // const nicknameChangeSub = () => {
  //   return nicknameSubject
  //     .pipe(debounceTime(500), distinctUntilChanged())
  //     .subscribe((newNickname) => {
  //       setUserData({ ...userData, nickname: newNickname });
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
    setUserData({ ...userData, email: newEmail });

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
    setUserData({ ...userData, birth: newBirth });

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

  //수정 핸들러
  const [isEditMode, setIsEditMode] = useState(false);

  //수정모드
  const enableEditMode = () => {
    //비밀번호 확인 모달창 열기
    setIsModalOpen(true);
    // setIsEditMode(true);
  };

  //저장모드, params 서버에 전달
  const submit = (id) => {
    const params = {
      userData,
    };

    setIsEditMode(false);

    if (
      !errors?.email?.pattern &&
      !errors?.nickname?.duplicated &&
      !errors?.birth?.eight
    ) {
      infoUpdate(id, params)
        .then((res) => {
          console.log("res: ", res);
          dispatch(updateUser(res.data));
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    } else {
      setIsEditMode(true);
    }
  };

  //모달창 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  //모달창 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Col>
        <div className="my-info">
          <h2 className="main__title">내 정보</h2>
          <Form name="form_item_path" layout="vertical">
            <div className="my-info__name my-info__box">
              <h2>이름</h2>
              {isEditMode ? (
                <div>
                  <Input
                    type="text"
                    defaultValue={userData.name}
                    onChange={(e) =>
                      setUserData({ ...userData, name: e.target.value })
                    }
                  ></Input>
                </div>
              ) : (
                <div>
                  <div>{user.name}</div>
                </div>
              )}
            </div>
            <div className="my-info__id my-info__box">
              <h2>아이디</h2>
              {isEditMode ? (
                <div>
                  <Input
                    type="text"
                    defaultValue={userData.nickname}
                    // onChange={(e) =>
                    //   setUserData({ ...userData, nickname: e.target.value })
                    // }
                    onChange={(e) => {
                      // nicknameSubject.next(e.target.value);
                    }}
                  ></Input>
                  <div className="my_info__hint">
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
                    {errors?.nickname?.duplicated ? (
                      <p>{errors?.nickname?.duplicated}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div>{user.nickname}</div>
                </div>
              )}
            </div>
            <div className="my-info__email my-info__box">
              <h2>이메일</h2>
              {isEditMode ? (
                <div>
                  <Input
                    type="text"
                    defaultValue={userData.email}
                    onChange={emailChange}
                  ></Input>
                  <div className="my_info__hint">
                    {errors?.email?.pattern ? (
                      <p>{errors.email.pattern}</p>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div>{user.email}</div>
                </div>
              )}
            </div>
            <div className="my-info__birth my-info__box">
              <h2>생년월일 8자리</h2>
              {isEditMode ? (
                <div>
                  <Input
                    type="text"
                    defaultValue={userData.birth}
                    onChange={birthCheck}
                  ></Input>
                  <div className="my_info__hint">
                    {errors?.birth?.eight ? <p>{errors.birth.eight}</p> : ""}
                  </div>
                </div>
              ) : (
                <div>
                  <div>{user.birth}</div>
                </div>
              )}
            </div>
            <div className="my-info__button">
              {isEditMode ? (
                <Button onClick={() => submit(user.id)}>저장하기</Button>
              ) : (
                <Button onClick={enableEditMode}>수정하기</Button>
              )}
            </div>
            {console.log(userData)}
          </Form>
          <PasswordCheckModal
            isModalOpen={isModalOpen}
            handleCancle={handleCancel}
            isEditMode={() => {
              setIsEditMode(true);
            }}
          ></PasswordCheckModal>
        </div>
      </Col>
    </>
  );
};

export default MyInfoPage;
