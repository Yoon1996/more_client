import { Modal } from "antd";
import React, { useState } from "react";
import { mailAuthenticate } from "../service/mail.service";
import "./find_modal.component.scss";
import MoreButton from "./more-button.component";
import MoreInput from "./more-input.component";

const FindModalComponent = ({ isModalOpen, handleCancel }) => {
  const [isLoginMode, setIsLoginMode] = useState(false);
  //이메일 등록
  const [email, setEmail] = useState("");

  //이메일 인증하기
  const byEmail = () => {
    const param = {
      email: email,
    };
    mailAuthenticate(param)
      .then((res) => {
        console.log("res: ", res);
        setIsLoginMode(true);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <>
      {isLoginMode ? (
        <Modal className="findModal" open={isModalOpen} onCancel={handleCancel}>
          <div className="findModal__title">비밀번호 재설정</div>
          <div className="findModal__util"></div>
          <>
            <div className="findModal__success">
              <img src="/icon/done.svg" alt="" />
            </div>
            <div className="findModal__info">
              보내드린 임시번호로 재로그인 해주세요
            </div>
          </>
          <MoreButton
            type="fill"
            className="findModal__email"
            onClick={() => {
              handleCancel();
              setIsLoginMode(false);
            }}
          >
            로그인 창으로 이동
          </MoreButton>
        </Modal>
      ) : (
        <Modal className="findModal" open={isModalOpen} onCancel={handleCancel}>
          <div className="findModal__title">비밀번호 재설정</div>
          <div className="findModal__util"></div>
          <>
            <div className="findModal__info">
              가입시 등록한 이메일을 입력해주세요.
            </div>
            <MoreInput
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></MoreInput>
          </>
          <MoreButton
            type={"fill"}
            className="findModal__email"
            onClick={byEmail}
          >
            임시번호 전송
          </MoreButton>
        </Modal>
      )}
    </>
  );
};

export default FindModalComponent;
