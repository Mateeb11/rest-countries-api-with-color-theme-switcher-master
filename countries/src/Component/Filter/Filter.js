import classes from "./Filter.module.css";

const Filter = () => {
  return (
    <section>
      <label htmlFor="search">search</label>
      <input type="search" id="search" />
      <label htmlFor="filter">filter</label>
      <select name="filter" id="filter">
        <option value="1"></option>
        <option value="2"></option>
        <option value="3"></option>
        <option value="4"></option>
      </select>
    </section>
  );
};

export default Filter;
