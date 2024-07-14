import { useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router-dom";
import  Images  from "../../Images/Nutz.jpeg";

import "./index.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  let navigate = useNavigate();

  function onChangeUsername(event) {
    setUsername(event.target.value);
  }

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, {
      expires: 30,
    });
    navigate("/");
  };

  const onSubmitFailure = (errorMsg) => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();

  
    const userDetails = { email: username, password };

    const url = "http://localhost:5000/users/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (response.ok) {
        console.log(data)
        onSubmitSuccess(data.jwt_token);
      } else {
        onSubmitFailure(data.error_msg);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error, e.g., show an error message to the user
      onSubmitFailure("Error submitting form. Please try again later.");
    }
  };


  const renderPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
          autocomplete="current-password"
        />
      </>
    );
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME/EMAIL
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username/Email"
          autocomplete="username"
        />
      </>
    );
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const onclickSignupBtn = () => {
    navigate("/signup");
  };

  return (
    <div className="login-form-container">
      <img
        src={Images}
        className="login-website-logo-mobile-image"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="login-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src={Images}
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderPasswordField()}</div>
        <button type="submit" className="login-button">
          Login
        </button>
        {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        <div className="new-user-container">
          <p>New user ? Create an account</p>
          <button
            type="button"
            onClick={onclickSignupBtn}
            className="bottom-login-button"
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
