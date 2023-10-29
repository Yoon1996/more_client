import { Button, Col } from "antd";
import React, { useState } from "react";
import PasswordCheckModal from "../component/password_check.modal";

const WithdrawPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  //모달창 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const withDrawHandler = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Col>
        <div className="withdraw">
          <h2 className="main__title">회원 탈퇴하기</h2>
          <div className="withdraw__notice">
            <span>회원 탈퇴를 신청하기 전에 아래 사항을 꼭 확인해주세요.</span>
          </div>
        </div>
        <div className="withdraw__button">
          <Button onClick={withDrawHandler}>탈퇴하기</Button>
        </div>
        <PasswordCheckModal
          isModalOpen={isModalOpen}
          handleCancle={handleCancel}
        ></PasswordCheckModal>
      </Col>
    </>
  );
};

export default WithdrawPage;
