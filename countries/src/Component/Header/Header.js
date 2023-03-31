import classes from "./Header.module.css";

const Header = () => {
  return (
    <header className={classes.header}>
      <h2 className={classes.title}>hi</h2>
      <button>Dark Mode</button>
    </header>
  );
};

export default Header;
