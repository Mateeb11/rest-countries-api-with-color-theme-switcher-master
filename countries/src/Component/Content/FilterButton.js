import { useState, useRef, useEffect } from "react";

import classes from "./FilterButton.module.css";
import { MaterialSymbol } from "react-material-symbols";

let regions = [];

export default function FilterButton({ mode, setRegions }) {
  const [isClicked, setIsClicked] = useState(false);

  const showFilterHandler = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);
  };

  const regionFilter = (event) => {
    console.log(regions);
    if (!regions.includes(event.target.innerText)) {
      regions = [...regions, event.target.innerText];
    } else {
      regions = regions.filter((region) => region !== event.target.innerText);
    }
    console.log(regions);
    setRegions(regions);
  };

  return (
    <div className={classes.container}>
      <div
        className={`${classes.selectBtn} ${isClicked && classes.open} ${
          mode && classes.lightMode
        }`}
        onClick={showFilterHandler}
      >
        <span className={`${classes.btnText} ${mode && classes.lightMode}`}>
          Filter by region
        </span>

        <MaterialSymbol
          icon="expand_more"
          size={20}
          style={
            mode
              ? isClicked
                ? {
                    color: "var(--very-dark-blue-text)",
                    transform: "rotate(-180deg)",
                    transition: "transform .5s ease",
                  }
                : {
                    color: "var(--very-dark-blue-text)",
                    transform: "rotate(0deg)",
                    transition: "transform .5s ease",
                  }
              : isClicked
              ? {
                  color: "white",
                  transform: "rotate(-180deg)",
                  transition: "transform .5s ease",
                }
              : {
                  color: "white",
                  transform: "rotate(0deg)",
                  transition: "transform .5s ease",
                }
          }
        />
      </div>

      <ul className={`${classes.listItems} ${mode && classes.lightMode}`}>
        <li
          className={`${classes.item} ${mode && classes.lightMode}`}
          onClick={regionFilter}
          value="Africa"
        >
          <span>Africa</span>
        </li>
        <li
          className={`${classes.item} ${mode && classes.lightMode}`}
          onClick={regionFilter}
        >
          <span>Americas</span>
        </li>
        <li
          className={`${classes.item} ${mode && classes.lightMode}`}
          onClick={regionFilter}
        >
          <span>Asia</span>
        </li>
        <li
          className={`${classes.item} ${mode && classes.lightMode}`}
          onClick={regionFilter}
        >
          <span>Europe</span>
        </li>
        <li
          className={`${classes.item} ${mode && classes.lightMode}`}
          onClick={regionFilter}
        >
          <span>Oceania</span>
        </li>
      </ul>
    </div>
  );
}
