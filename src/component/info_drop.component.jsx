import "./info_drop.component.scss";
import { useNavigate } from "react-router-dom";

const InfoDropComponent = () => {
  const navigate = useNavigate();

  const goMyinfo = () => {
    navigate("/my-account/my_info_page");
  };

  const goCategory = () => {
    navigate("/my-account/category_list_page");
  };

  const goWithdraw = () => {
    navigate("/my-account/withdraw_page");
  };

  return (
    <>
      <ul className="infoDrop">
        <li onClick={goMyinfo} className="infoDrop__menu">
          내정보
        </li>
        <li onClick={goCategory} className="infoDrop__menu`">
          카테고리 관리
        </li>
        <li onClick={goWithdraw} className="infoDrop__menu">
          탈퇴하기
        </li>
      </ul>
    </>
  );
};

export default InfoDropComponent;
