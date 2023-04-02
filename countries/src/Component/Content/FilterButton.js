import { useState, useRef } from "react";

import classes from "./FilterButton.module.css";
import { MaterialSymbol } from "react-material-symbols";

export default function FilterButton({ mode }) {
  const [isClicked, setIsClicked] = useState(false);

  const filterHandler = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);

    console.log(list.current);
  };

  const list = useRef(null);
  return (
    <div className={classes.container}>
      <div
        className={`${classes.selectBtn} ${isClicked && classes.open} ${
          mode && classes.lightMode
        }`}
        onClick={filterHandler}
      >
        <span className={`${classes.btnText} ${mode && classes.lightMode}`}>
          Filter by region
        </span>

        <MaterialSymbol
          icon="expand_more"
          size={20}
          style={
            mode ? { color: "var(--very-dark-blue-text)" } : { color: "white" }
          }
        />
      </div>

      <ul
        className={`${classes.listItems} ${mode && classes.lightMode}`}
        ref={list}
      >
        <li className={`${classes.item} ${mode && classes.lightMode}`}>
          <span>Africa</span>
        </li>
        <li className={`${classes.item} ${mode && classes.lightMode}`}>
          <span>America</span>
        </li>
        <li className={`${classes.item} ${mode && classes.lightMode}`}>
          <span>Asia</span>
        </li>
        <li className={`${classes.item} ${mode && classes.lightMode}`}>
          <span>Europe</span>
        </li>
        <li className={`${classes.item} ${mode && classes.lightMode}`}>
          <span>Oceania</span>
        </li>
      </ul>
    </div>
  );
}
