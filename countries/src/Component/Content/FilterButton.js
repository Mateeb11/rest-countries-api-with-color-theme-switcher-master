import { useState, useRef, useEffect } from "react";

import classes from "./FilterButton.module.css";
import { MaterialSymbol } from "react-material-symbols";

let regions = [];

export default function FilterButton({ mode, setRegions }) {
  const [isClicked, setIsClicked] = useState(false);
  const [buttonText, setButtonText] = useState("Filter by region");

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
  useEffect(() => {
    setRegions(regions);
    for (let i = 0; i < regions.length; i++) {
      checkboxHandler(regions[i]);
    }
    numberOfRegions();
  }, []);

  const regionFilter = (region) => {
    if (!regions.includes(region)) {
      regions = [...regions, region];
    } else {
      regions = regions.filter((r) => r !== region);
    }

    checkboxHandler(region);

    setRegions(regions);
    numberOfRegions();
  };

  const numberOfRegions = () => {
    if (regions.length === 0) {
      setButtonText("Fitler by region");
    }
    if (regions.length === 1) {
      setButtonText("1 Selected");
    }
    if (regions.length === 2) {
      setButtonText("2 Selected");
    }
    if (regions.length === 3) {
      setButtonText("3 Selected");
    }
    if (regions.length === 4) {
      setButtonText("4 Selected");
    }
    if (regions.length === 5) {
      setButtonText("All Selected");
    }
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
          {buttonText}
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
