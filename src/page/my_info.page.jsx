import { Button, Col, Form, Input } from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PasswordCheckModal from "../component/password_check.modal";
import { infoUpdate } from "../service/user.service";
import { updateUser } from "../store/user.store";
import MoreInput from "../component/more-input.component";
import MoreButton from "../component/more-button.component";
import "./my_info.page.scss";

const MyInfoPage = () => {
  const user = useSelector((rootState) => rootState.user);
  console.log("user: ", user);

  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    name: user.name,
    email: user.email,
    birth: user.birth,
  });

  const [errors, setErrors] = useState({});

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

  //저장모드, params 서버에 전달
  const submit = (id) => {
    const params = {
      userData,
    };

    if (
      !errors?.email?.pattern &&
      !errors?.nickname?.duplicated &&
      !errors?.birth?.eight
    ) {
      infoUpdate(id, params)
        .then((res) => {
          // console.log("res: ", res);
          dispatch(updateUser(res.data));
          setIsPositive(true);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
    }
  };

  //확인 멘트 창
  const [isPositive, setIsPositive] = useState(false);

  return (
    <>
      <div className="my-info">
        <div className="my-info__name my-info__box">
          <div className="my-info__sub-title">이름</div>
          <MoreInput
            type="text"
            defaultValue={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          ></MoreInput>
        </div>
        <div className="my-info__email my-info__box">
          <div className="my-info__sub-title">이메일</div>
          <MoreInput
            type="text"
            defaultValue={userData.email}
            onChange={emailChange}
          ></MoreInput>
          <div className="my_info__hint">
            {errors?.email?.pattern ? <p>{errors.email.pattern}</p> : ""}
          </div>
        </div>
        <div className="my-info__birth my-info__box">
          <div className="my-info__sub-title">생년월일 8자리</div>
          <MoreInput
            type="text"
            defaultValue={userData.birth}
            onChange={birthCheck}
          ></MoreInput>
          <div className="my_info__hint">
            {errors?.birth?.eight ? <p>{errors.birth.eight}</p> : ""}
          </div>
        </div>
        <div className="my-info__button-wrap">
          {isPositive ? (
            <div className="my-info__correct">
              <div>정보가 성공적으로 변경되었습니다!</div>
              <div>
                <img src="/icon/arrow-done.svg" alt="" />
              </div>
            </div>
          ) : null}

          <MoreButton
            type="fill"
            className="my-info__button"
            onClick={() => submit(user.id)}
          >
            수정하기
          </MoreButton>
        </div>
      </div>
    </>
  );
};

export default MyInfoPage;
