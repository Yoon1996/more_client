import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import "./find_modal.component.scss";
import { mailAuthenticate } from "../service/mail.service";
import { useSelector } from "react-redux";

const FindModalComponent = ({ isModalOpen, handleCancel }) => {
  //이메일 등록
  const [email, setEmail] = useState("");
  console.log(email);

  //이메일 인증하기
  const byEmail = () => {
    const param = {
      email: email,
    };
    mailAuthenticate(param)
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  return (
    <>
      <Modal open={isModalOpen} onCancel={handleCancel}>
        <div className="findModal__title">비밀번호 찾기</div>
        <div className="findModal__util"></div>
        <>
          <div className="findModal__info">
            비밀번호 찾기를 위해 이메일을 입력해주세요.
          </div>
          <Input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </>
        <Button className="findModal__email" onClick={byEmail}>
          이메일 인증하기
        </Button>
      </Modal>
    </>
  );
};

export default FindModalComponent;
