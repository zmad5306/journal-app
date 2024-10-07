import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

function Login({ onSuccess }) {
  return (
    <div class="login-button-container">
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          onSuccess(credentialResponse);
        }}
        onError={() => {
          alert("Login Failed");
        }}
      ></GoogleLogin>
    </div>
  );
}

export default Login;
