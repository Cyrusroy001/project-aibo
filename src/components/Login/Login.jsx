import React from "react";
import "./Login.css";

function Login({ googleSignIn }) {
  return (
    <div className="parent-div">
      <div className="login-container">
        <h1>Welcome to Aibo</h1>
        <button
          data-hover="Go to homepage!"
          className="sign-in-button"
          onClick={googleSignIn}
        >
          <div>Log in with Google</div>
        </button>
      </div>
    </div>
  );
}

export default Login;
