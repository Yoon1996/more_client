import { GoogleOAuthProvider, useGoogleLogin } from "@react-oauth/google";
import { Button } from "antd";
import React from "react";

const GoogleLoginButtonComponent = () => {
  const clientId =
    "926618531398-36t5psht9gd5c2sk9irjdf8vlvltpd22.apps.googleusercontent.com";

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => console.log(tokenResponse),
  });

  return (
    <>
      {/* <GoogleOAuthProvider clientId={clientId}>
        <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onFailure={(err) => {
            console.log(err);
          }}
        />
      </GoogleOAuthProvider> */}
      <Button onClick={() => login()}>loginBUtton</Button>
    </>
  );
};

export default GoogleLoginButtonComponent;
