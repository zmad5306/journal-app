import { GoogleLogin } from "@react-oauth/google";

function Login({ onSuccess }) {
  return (
    <GoogleLogin
      onSuccess={(credentialResponse) => {
        onSuccess(credentialResponse);
      }}
      onError={() => {
        alert("Login Failed");
      }}
    ></GoogleLogin>
  );
}

export default Login;
