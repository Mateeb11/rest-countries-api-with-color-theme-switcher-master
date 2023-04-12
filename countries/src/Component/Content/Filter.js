import { useRef } from "react";

import classes from "./Filter.module.css";
import { MaterialSymbol } from "react-material-symbols";

import FilterButton from "./FilterButton";

const Filter = ({ setSearch, setRegions, mode }) => {
  const search = useRef("");

  const searchBoxHandler = () => {
    search.current.focus();
  };
  const searchHandler = (event) => {
    setSearch(event.target.value);
  };
  return (
    <section className={`${classes.container}`}>
      <form
        className={`${classes.searchBox}  ${mode && classes.lightMode}`}
        onClick={searchBoxHandler}
        onSubmit={(e) => search.current.blur()}
      >
        <button
          className={`${classes.searchButton}  ${mode && classes.lightMode}`}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <MaterialSymbol
            icon="search"
            style={
              mode
                ? { color: "var(--very-dark-blue-text)" }
                : { color: "white" }
            }
            size={20}
          />
        </button>

        <input
          className={`${classes.searchInput}  ${mode && classes.lightMode}`}
          type="text"
          placeholder="Search for a country..."
          ref={search}
          onChange={searchHandler}
        />
      </form>

      <FilterButton mode={mode} setRegions={setRegions} />
    </section>
  );
};

export default Filter;
