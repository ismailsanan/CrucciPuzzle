import { useRef, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";

import { login } from "../../lib/api";

import classes from "./LoginForm.module.css";

const LoginForm = () => {
  const usernameRef = useRef();
  const passwordRef = useRef();

  const authContext = useContext(AuthContext);

  const history = useHistory();

  const [reset, setReset] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const loginHandler = async (event) => {
    event.preventDefault();

    // call db
    const loggedInUser = await login(
      usernameRef.current.value,
      passwordRef.current.value
    );

    if (!loggedInUser) {
      //console.log("auth failed");
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      setReset(!reset);
      setLoginFailed(!loginFailed);
    } else {
      //console.log("auth success", loggedInUser);
      authContext.login(loggedInUser.data.id);
      history.push("/game");
    }
  };

  return (
    <section className={classes.auth}>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <div className={classes.control}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" required ref={usernameRef} />
        </div>

        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" required ref={passwordRef} />
        </div>

        <div className={classes.actions}>
          <button>Login</button>
        </div>
      </form>
     {loginFailed &&  <p style={{color:'red'} }>invalid Username/Password </p> } 
    </section>
  );
};

export default LoginForm;