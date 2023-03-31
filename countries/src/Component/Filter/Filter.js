import { useRef } from "react";

import classes from "./Filter.module.css";
import { MaterialSymbol } from "react-material-symbols";

import FilterButton from "./FilterButton";

const Filter = () => {
  const search = useRef("");

  const searchBoxHandler = () => {
    search.current.focus();
  };
  return (
    <section className={classes.container}>
      <form className={classes.searchBox} onClick={searchBoxHandler}>
        <button className={classes.searchButton}>
          <MaterialSymbol icon="search" color="white" size={20} />
        </button>

        <input
          className={classes.searchInput}
          type="text"
          placeholder="Search for a country..."
          ref={search}
        />
      </form>
      <FilterButton />
    </section>
  );
};

export default Filter;
