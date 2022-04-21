import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authContext = useContext(AuthContext);

  const isLoggedIn = authContext.isLogged;

  const history = useHistory();

  const logoutHandler = () => {
    authContext.logout();
    history.replace("/");
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>CruciPuzzle</div>
      <nav className={classes.nav}>
        <ul>
          <li>
            <NavLink to="/how-to-play" activeClassName={classes.active}>
              How To Play
            </NavLink>
          </li>
          <li>
            <NavLink to="/hall-of-fame" activeClassName={classes.active}>
              Hall of Fame
            </NavLink>
          </li>

          {!isLoggedIn && (
            <li>
              <NavLink to="/login" activeClassName={classes.active}>
                Login
              </NavLink>
            </li>
          )}

          {!isLoggedIn && (
            <li>
              <NavLink to="/game" activeClassName={classes.active}>
                Play as a Guest
              </NavLink>
            </li>
          )}

          {isLoggedIn && (
            <li style={{ color: "white" }} onClick={logoutHandler}>
              Logout
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;