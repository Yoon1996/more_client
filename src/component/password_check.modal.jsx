import { Button, Input, Modal } from "antd";
import React, { useState } from "react";
import { pwCheck, withDraw } from "../service/user.service";
import { useNavigate } from "react-router-dom";

const PasswordCheckModal = ({ isModalOpen, handleCancle, isEditMode }) => {
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  //에러 스타일
  const errorStyle = {
    color: "red",
  };
  const navigate = useNavigate();

  const submit = () => {
    const params = {
      password: password,
    };
    pwCheck(params)
      .then((res) => {
        if (res.data.success) {
          handleCancle();
          if (handleCancle) {
            if (isEditMode) {
              isEditMode();
            } else {
              handleCancle();
              withDraw()
                .then((res) => {
                  console.log("res: ", res);
                  navigate("/login/member_login");
                })
                .catch((err) => {
                  console.log("err: ", err);
                });
            }
          }
        } else {
          setErrors({
            ...errors,
            password: { wrong: "비밀번호가 틀렸습니다." },
          });
        }
      })
      .catch((err) => {
        console.log("err: ", err);
        if (err.response.data.statusMessage === "INVALID_PASSWORD") {
          setErrors({
            ...errors,
            password: { wrong: "비밀번호가 틀렸습니다." },
          });
        }
      });
  };

  return (
    <>
      <Modal
        className="modal"
        width={300}
        title=""
        open={isModalOpen}
        onCancel={handleCancle}
      >
        <div className="modal_feild">
          <div>비밀 번호를 입력해주세요.</div>
          <div>
            <form action="">
              <Input
                type="password"
                value={password}
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Input>
              {errors?.password?.wrong ? (
                <p style={{ color: errorStyle.color }}>
                  {errors?.password?.wrong}
                </p>
              ) : (
                ""
              )}
            </form>
          </div>
          <Button onClick={handleCancle}>취소</Button>
          <Button onClick={submit}>확인</Button>
        </div>
      </Modal>
    </>
  );
};

export default PasswordCheckModal;
