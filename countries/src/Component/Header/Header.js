import classes from "./Header.module.css";

import { MaterialSymbol } from "react-material-symbols";

const Header = ({ mode, setMode }) => {
  return (
    <header className={`${classes.header} ${mode && classes.lightMode}`}>
      <h2 className={`${classes.title} ${mode && classes.lightMode}`}>
        Where in the world?
      </h2>
      {mode ? (
        <div
          className={`${classes.mode} ${classes.lightMode}`}
          onClick={() => setMode(false)}
        >
          <MaterialSymbol
            icon="dark_mode"
            size={24}
            style={{
              color: "var(--very-dark-blue-text)",
              transition: "all 0.5s ease-in-out",
            }}
          />
          Dark mode
        </div>
      ) : (
        <div className={classes.mode} onClick={() => setMode(true)}>
          <MaterialSymbol
            icon="light_mode"
            style={{
              color: "var(--white)",
              transition: "all 0.5s ease-in-out",
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
