import { useDispatch, useSelector } from "react-redux";
import "./info_drop.component.scss";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../store/user.store";

const InfoDropComponent = () => {
  const user = useSelector((rootState) => rootState.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goMyinfo = () => {
    navigate("/my-account/my_info_page");
  };

  const goCategory = () => {
    navigate("/my-account/category_list_page");
  };

  const goLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <div className="infoDrop">
        <div className="infoDrop__upper">
          <div className="infoDrop__img">
            <img src="/icon/profile.svg" alt="" />
          </div>
          <div className="infoDrop__nickname">닉네임 {user.name}</div>
          <div className="infoDrop__email">{user.email}</div>
        </div>
        <div className="infoDrop__under">
          <div onClick={goMyinfo} className="infoDrop__mypage infoDrop__menu">
            내 정보
          </div>
          <div
            onClick={goCategory}
            className="infoDrop__category infoDrop__menu"
          >
            카테고리 관리
          </div>
          <div onClick={goLogout} className="infoDrop__logout infoDrop__menu">
            로그아웃
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoDropComponent;
