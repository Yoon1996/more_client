import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MoreButton from "../component/more-button.component";
import "./withdraw_page.scss";
import { withDraw } from "../service/user.service";

const WithdrawPage = () => {
  const user = useSelector((rootState) => rootState.user);
  const navigate = useNavigate();
  const withdrawList = [
    "등록하고싶은 레시피가 없어요.",
    "레시피 등록 기능이 아쉬워요.",
    "더 좋은 서비스를 찾았어요.",
    "계정을 새로 만들고 싶어요.",
    "기타",
  ];

  //checkbox 상태 변경
  const [isCheck, setIsCheck] = useState(false);
  const clickCheckbox = () => {
    setIsCheck((current) => !current);
  };

  //탈퇴하기
  const withDrawHandler = () => {
    const params = {
      message: reason,
      buttonMessage: buttonMessage,
    };

    if (!isCheck) {
      setErorrs({ ...errors, require: "유의사항 확인에 동의해주세요." });
    }
    withDraw(params)
      .then((res) => {
        console.log("res: ", res);
        setErorrs({ ...errors, require: null });
        navigate("/login/member_login");
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  };

  //에러메세지
  const [errors, setErorrs] = useState({});

  //탈퇴사유버튼 메세지
  const [buttonMessage, setButtonMessage] = useState("");
  //textarea 메세지
  const [reason, setReason] = useState("");

  //버튼 메세지 가져오기
  const getmessage = (e) => {
    const clickedValue = e.target.innerText;
    console.log("clickedValue: ", clickedValue);
    setButtonMessage(clickedValue);
  };

  //버튼 포커싱하기
  const [selectedButton, setSelectedButton] = useState(null);
  const clicked = (index) => {
    setSelectedButton(index);
    console.log(index);
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
              <div
                className={`withdraw__notice__${
                  errors?.require ? "hint" : null
                }`}
              >
                회원 탈퇴 유의사항을 확인하였으며 이에 동의합니다.
              </div>
            </div>
          </div>
          <div className="withdraw__notice__under">
            <div className="withdraw__notice__under-ment">
              {user.name}님이 계정을 삭제하시는 이유가 궁금해요.
            </div>
            <div className="withdraw__notice__buttons">
              {withdrawList.map((button, index) => (
                <MoreButton
                  key={index}
                  id={index}
                  className={`withdraw__notice__button ${
                    selectedButton === index ? "focused" : ""
                  }`}
                  type="fill"
                  getmessage={getmessage}
                  checkedButton={clicked}
                >
                  {button}
                </MoreButton>
              ))}
            </div>
            <textarea
              style={{ resize: "none" }}
              className="withdraw__notice__input"
              placeholder="서비스 탈퇴 사유에 대해 알려주세요.
                ㅇㅇ님의 소중한 피드백을 담아 
더 나은 서비스로 보답 드리도록 하겠습니다."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className="withdraw__button">
          <MoreButton type="outline" onClick={withDrawHandler}>
            탈퇴하기
          </MoreButton>
          <MoreButton onClick={() => navigate("/main/recipe_list")} type="fill">
            취소
          </MoreButton>
        </div>
      </div>
    </>
  );
};

export default WithdrawPage;
