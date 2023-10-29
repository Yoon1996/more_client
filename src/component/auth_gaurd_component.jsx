import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGaurdComponent = ({ children }) => {
  const user = useSelector((rootState) => rootState.user);

  if (!user.isInit) {
    return <div>Loading...</div>;
  } else if (user.id) {
    return children;
  } else {
    console.log("not user");
    return <Navigate to="/login/member_login" replace={true}></Navigate>;
  }
};

export default AuthGaurdComponent;
