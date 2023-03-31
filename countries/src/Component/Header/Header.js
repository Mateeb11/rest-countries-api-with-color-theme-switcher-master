import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <h2 className={classes.title}>Where in the world?</h2>
      <button>Dark Mode</button>
    </header>
  );
};

export default Header;
