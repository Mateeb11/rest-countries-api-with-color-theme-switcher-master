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
        <span className={classes.btnTex}>Languages</span>
        <span className={classes.arrowDwn}>
          <MaterialSymbol
            icon="expand_circle_down"
            size={20}
            fill
            style={{ color: "rgb(91, 73, 255)" }}
            className={classes.arrowDwn}
          />
        </span>
      </div>

      <ul className={`${classes.listItems}  `} ref={list}>
        <li className={classes.item}>
          <span className={classes.checkbox}>
            <i class="fa-solid fa-check check-icon"></i>
          </span>
          <span class="item-text">French</span>
        </li>
        <li className={classes.item}>
          <span className={classes.checkbox}>
            <i class="fa-solid fa-check check-icon"></i>
          </span>
          <span class="item-text">English</span>
        </li>
        <li className={classes.item}>
          <span className={classes.checkbox}>
            <i class="fa-solid fa-check check-icon"></i>
          </span>
          <span class="item-text">English</span>
        </li>
        <li className={classes.item}>
          <span className={classes.checkbox}>
            <i class="fa-solid fa-check check-icon"></i>
          </span>
          <span class="item-text">English</span>
        </li>
        <li className={classes.item}>
          <span className={classes.checkbox}>
            <i class="fa-solid fa-check check-icon"></i>
          </span>
          <span class="item-text">English</span>
        </li>
      </ul>
    </div>
  );
}
