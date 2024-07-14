import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  Images  from "../../Images/Nutz.jpeg";

import "./index.css";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [emailid, setEmailId] = useState("");
  const [firstPassword, setFirstPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");
  const [serverError,setServerError]=useState("")

  const [showSubmitError, setShowSubmitError] = useState(false);

  const [showPasswordNotMatchError, setshowPasswordNotMatchError] =
    useState(false);
  const [usernamePasswordError, setusernamePasswordError] = useState(false);

  let navigate = useNavigate();

  const onChangeEmailId = (event) => {
    setEmailId(event.target.value);
  };

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangeFirstPassword = (event) => {
    setFirstPassword(event.target.value);
  };

  const onChangeSecondPassword = (event) => {
    setSecondPassword(event.target.value);
  };

  const renderUsernameField = () => {
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-field"
          value={username}
          onChange={onChangeUsername}
          placeholder="Username"
          autocomplete="username"
        />
      </>
    );
  };

  const renderEmailIDField = () => {
    return (
      <>
        <label className="input-label" htmlFor="emailid">
          EMAIL ID
        </label>
        <input
          type="text"
          id="emailid"
          className="username-input-field"
          value={emailid}
          onChange={onChangeEmailId}
          placeholder="EmailID"
          autocomplete="EmailID"
        />
      </>
    );
  };

  const renderFirstPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={firstPassword}
          onChange={onChangeFirstPassword}
          placeholder="Password"
        />
        {showPasswordNotMatchError && (
          <p className="error-message">Password not match</p>
        )}
      </>
    );
  };

  const renderSecondPasswordField = () => {
    return (
      <>
        <label className="input-label" htmlFor="password">
          Re-Enter Password
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={secondPassword}
          onChange={onChangeSecondPassword}
          placeholder="Re-Enter Password"
        />
        {showPasswordNotMatchError && (
          <p className="error-message">Password not match</p>
        )}
      </>
    );
  };

  const submitForm = async (event) => {
    event.preventDefault();
    setusernamePasswordError(false);
    setshowPasswordNotMatchError(false);
    setShowSubmitError(false);

    if (!username || !firstPassword || !secondPassword) {
      setusernamePasswordError(true);
      return;
    }

    if (firstPassword !== secondPassword) {
      setshowPasswordNotMatchError(true);
      return;
    }
    console.log("working")

    const userDetails = { username, email: emailid, password: firstPassword };
    const url = "http://localhost:5000/users/signup";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json()
      if (response.status === 201) {
        alert("Signup Success");
        navigate("/login");
      } else {
        setShowSubmitError(true);
        setServerError(data.message);
      }
    } catch (error) {
      
      setShowSubmitError(true);
     
    }
  };



  const onclickLoginButton = () => {
    navigate("/login");
  };

  return (
    <div className="signup-form-container">
      <img
        src={Images}
        className="signup-website-logo-mobile-image"
        alt="website logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
        className="signup-image"
        alt="website login"
      />
      <form className="form-container" onSubmit={submitForm}>
        <img
          src={Images}
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
        <div className="input-container">{renderUsernameField()}</div>
        <div className="input-container">{renderEmailIDField()}</div>
        <div className="input-container">{renderFirstPasswordField()}</div>
        <div className="input-container">{renderSecondPasswordField()}</div>
        <p className="promise">we promise, won't spam you.</p>
        <button type="submit" className="signup-button">
          Sign up
        </button>
        {usernamePasswordError && (
          <p className="error-message">Username or Password is empty</p>
        )}
        {showSubmitError && (
          <p className="error-message">{serverError}</p>
        )}
        <div className="already-account-container">
          <p>Already have an account ?</p>
          <button
            type="button"
            onClick={onclickLoginButton}
            className="bottom-login-button"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
