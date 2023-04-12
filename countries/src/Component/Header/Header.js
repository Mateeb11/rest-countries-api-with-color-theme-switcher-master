import classes from "./Header.module.css";

import { MaterialSymbol } from "react-material-symbols";
import { useDispatch, useSelector } from "react-redux";

import { modeActions } from "../../store/mode-slice";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state) => state.mode.colorMode);

  const modeHandler = () => {
    dispatch(modeActions.toggle(true));
  };
  return (
    <header className={`${classes.header} ${mode && classes.lightMode}`}>
      <Link style={{ textDecoration: "none" }} to="/">
        <h2 className={`${classes.title} ${mode && classes.lightMode}`}>
          Where in the world?
        </h2>
      </Link>
      {mode ? (
        <div
          className={`${classes.mode} ${classes.lightMode}`}
          onClick={modeHandler}
        >
          <MaterialSymbol
            icon="dark_mode"
            size={24}
            style={{
              color: "var(--very-dark-blue-text)",
              transition: "all 1.5s ease-in-out",
            }}
          />
          Dark mode
        </div>
      ) : (
        <div className={classes.mode} onClick={modeHandler}>
          <MaterialSymbol
            icon="light_mode"
            style={{
              color: "var(--white)",
              transition: "all 1.5s ease-in-out",
            }}
            size={24}
            fill
            className={classes.mode}
          />
          Light mode
        </div>
      )}
    </header>
  );
};

export default Header;
