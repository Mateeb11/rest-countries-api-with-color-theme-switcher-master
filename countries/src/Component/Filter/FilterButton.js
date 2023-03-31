import { useState, useRef } from "react";

import classes from "./FilterButton.module.css";
import { MaterialSymbol } from "react-material-symbols";

export default function FilterButton() {
  const [isClicked, setIsClicked] = useState(false);

  const filterHandler = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);

    console.log(list.current);
  };

  const list = useRef(null);
  return (
    <div className={classes.container}>
      <div
        className={`${classes.selectBtn} ${isClicked && classes.open}`}
        onClick={filterHandler}
      >
        <span className={classes.btnText}>Filter by region</span>

        <MaterialSymbol icon="expand_more" size={20} color="white" />
      </div>

      <ul className={`${classes.listItems}  `} ref={list}>
        <li className={classes.item}>
          <span class="item-text">Africa</span>
        </li>
        <li className={classes.item}>
          <span class="item-text">America</span>
        </li>
        <li className={classes.item}>
          <span class="item-text">Asia</span>
        </li>
        <li className={classes.item}>
          <span class="item-text">Europe</span>
        </li>
        <li className={classes.item}>
          <span class="item-text">Oceania</span>
        </li>
      </ul>
    </div>
  );
}
