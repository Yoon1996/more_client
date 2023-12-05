import { Button } from "antd";
import React, { useState } from "react";
import PasswordCheckModal from "../component/password_check.modal";
import MoreButton from "../component/more-button.component";
import MoreInput from "../component/more-input.component";
import "./withdraw_page.scss";
import { useSelector } from "react-redux";

const WithdrawPage = () => {
  const user = useSelector((rootState) => rootState.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //모달창 닫기
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const withDrawHandler = () => {
    setIsModalOpen(true);
  };

  //checkbox 상태 변경
  const [isCheck, setIsCheck] = useState(false);
  const clickCheckbox = () => {
    setIsCheck((current) => !current);
  };

  return (
    <>
      <div className="withdraw">
        <div className="withdraw__notice">
          <div className="withdraw__notice__upper">
            <div className="withdraw__notice__question">
              {user.name}님, 정말 탈퇴하시겠어요?
            </div>
            <div className="withdraw__notice__ment">
              <div>
                <img src="/icon/notice.svg" alt="" />
              </div>
              <div>탈퇴하면 저장한 레시피를 더 이상 볼 수 없게 돼요!</div>
            </div>
            <div className="withdraw__notice__ment">
              <div>
                <img src="/icon/notice.svg" alt="" />
              </div>
              <div>
                탈퇴 후 저장된 모든 정보가 삭제되며 이후 복구되지 않아요.
              </div>
            </div>
            <div className="withdraw__notice__ment">
              <div onClick={clickCheckbox} className="withdraw__notice__check">
                {isCheck ? (
                  <img src="/icon/check-selected.png" alt="" />
                ) : (
                  <img src="/icon/check-unselected.png" alt="" />
                )}
              </div>
              <div>회원 탈퇴 유의사항을 확인하였으며 이에 동의합니다.</div>
            </div>
          </div>
          <div className="withdraw__notice__under">
            <div className="withdraw__notice__under-ment">
              {user.name}님이 계정을 삭제하시는 이유가 궁금해요.
            </div>
            <div className="withdraw__notice__buttons">
              <MoreButton className="withdraw__notice__button" type="fill">
                등록하고싶은 레시피가 없어요.
              </MoreButton>
              <MoreButton className="withdraw__notice__button" type="fill">
                레시피 등록 기능이 아쉬워요
              </MoreButton>
              <MoreButton className="withdraw__notice__button" type="fill">
                더 좋은 서비스를 찾았어요
              </MoreButton>
              <MoreButton className="withdraw__notice__button" type="fill">
                계정을 새로 만들고 싶어요
              </MoreButton>
              <MoreButton className="withdraw__notice__button" type="fill">
                기타
              </MoreButton>
            </div>
            <MoreInput
              className="withdraw__notice__input"
              placeholder="서비스 탈퇴 사유에 대해 알려주세요.
                ㅇㅇ님의 소중한 피드백을 담아 
더 나은 서비스로 보답 드리도록 하겠습니다."
            ></MoreInput>
          </div>
        </div>
        <div className="withdraw__button">
          <MoreButton type="outline" onClick={withDrawHandler}>
            탈퇴하기
          </MoreButton>
          <MoreButton type="fill">취소</MoreButton>
        </div>
      </div>
      <PasswordCheckModal
        isModalOpen={isModalOpen}
        handleCancle={handleCancel}
      ></PasswordCheckModal>
    </>
  );
};

export default WithdrawPage;
