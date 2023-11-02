import { Modal } from "antd";
import React, { useState } from "react";
import { mailAuthenticate } from "../service/mail.service";
import "./find_modal.component.scss";
import { useNavigate } from "react-router-dom";

const FindModalComponent = ({ isModalOpen, handleCancel }) => {
  const navigate = useNavigate();
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
            <div className="findModal__info">
              보내드린 임시번호로 재로그인 해주세요
            </div>
          </>
          <button
            className="findModal__email"
            onClick={() => {
              handleCancel();
            }}
          >
            로그인 창으로 이동
          </button>
        </Modal>
      ) : (
        <Modal className="findModal" open={isModalOpen} onCancel={handleCancel}>
          <div className="findModal__title">비밀번호 재설정</div>
          <div className="findModal__util"></div>
          <>
            <div className="findModal__info">
              가입시 등록한 이메일을 입력해주세요.
            </div>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </>
          <button className="findModal__email" onClick={byEmail}>
            임시번호 전송
          </button>
        </Modal>
      )}
    </>
  );
};

export default FindModalComponent;
