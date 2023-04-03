import { useState, useRef, useEffect } from "react";

import classes from "./FilterButton.module.css";
import { MaterialSymbol } from "react-material-symbols";

let regions = [];

export default function FilterButton({ mode, setRegions }) {
  const [isClicked, setIsClicked] = useState(false);

  const [africa, setAfrica] = useState(false);
  const [americas, setAmericas] = useState(false);
  const [asia, setAsia] = useState(false);
  const [europe, setEurope] = useState(false);
  const [oceania, setOceania] = useState(false);

  const showFilterHandler = () => {
    isClicked ? setIsClicked(false) : setIsClicked(true);
  };

  const checkboxHandler = (region) => {
    if (region === "Africa") {
      setAfrica(!africa);
    } else if (region === "Americas") {
      setAmericas(!americas);
    } else if (region === "Asia") {
      setAsia(!asia);
    } else if (region === "Europe") {
      setEurope(!europe);
    } else if (region === "Oceania") {
      setOceania(!oceania);
    }
  };

  const regionFilter = (region) => {
    if (!regions.includes(region)) {
      regions = [...regions, region];
    } else {
      regions = regions.filter((r) => r !== region);
    }

    checkboxHandler(region);

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
          onClick={() => {
            regionFilter("Africa");
          }}
        >
          <span>Africa</span>
          <MaterialSymbol
            icon={africa ? "check_box" : "check_box_outline_blank"}
            size={25}
            fill
          ></MaterialSymbol>
        </li>
        <li
          className={`${classes.item} ${mode && classes.lightMode}`}
          onClick={() => {
            regionFilter("Americas");
          }}
        >
          <span>Americas</span>
          <MaterialSymbol
            icon={americas ? "check_box" : "check_box_outline_blank"}
            size={25}
            fill
          ></MaterialSymbol>
        </li>
        <li
          className={`${classes.item} ${mode && classes.lightMode}`}
          onClick={() => {
            regionFilter("Asia");
          }}
        >
          <span>Asia</span>
          <MaterialSymbol
            icon={asia ? "check_box" : "check_box_outline_blank"}
            size={25}
            fill
          ></MaterialSymbol>
        </li>
        <li
          className={`${classes.item} ${mode && classes.lightMode}`}
          onClick={() => {
            regionFilter("Europe");
          }}
        >
          <span>Europe</span>
          <MaterialSymbol
            icon={europe ? "check_box" : "check_box_outline_blank"}
            size={25}
            fill
          ></MaterialSymbol>
        </li>
        <li
          className={`${classes.item} ${mode && classes.lightMode}`}
          onClick={() => {
            regionFilter("Oceania");
          }}
        >
          <span>Oceania</span>
          <MaterialSymbol
            style={{ transition: "all 0.3s ease-in-out" }}
            icon={oceania ? "check_box" : "check_box_outline_blank"}
            size={25}
            fill
          ></MaterialSymbol>
        </li>
      </ul>
    </div>
  );
}
