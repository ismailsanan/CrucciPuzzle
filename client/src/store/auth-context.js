import React, { useState } from "react";

import { logout } from "../lib/api";

const AuthContext = React.createContext({
  isLogged: false,
  userId: 0,
  login: () => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [userIsLoggedIn, setUserIsLoggedIn] = useState({
    isLogged: false,
    userId: 0,
  });

  const loginHandler = (userId) => {
    //console.log("loginHandler", userId);
    setUserIsLoggedIn({
      isLogged: true,
      userId: userId,
    });
  };

  const logoutHandler = () => {
    logout()
      .then((res) => {
        setUserIsLoggedIn({
          isLogged: false,
          userId: 0,
        });
      })
      .catch((err) => {
        console.log(err, "LOGOUT FAILED");
        return;
      });
  };

  const contextValue = {
    isLogged: userIsLoggedIn.isLogged,
    userId: userIsLoggedIn.userId,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;