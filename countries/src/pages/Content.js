import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import Loader from "react-loading-indicators";

import Countries from "../Component/Content/Countries";
import Filter from "../Component/Content/Filter";

import classes from "./Content.module.css";
import useRequest from "../hooks/use-request";

export default function Content() {
  const mode = useSelector((state) => state.mode.colorMode);

  const {
    countries,
    loading,
    fetchCountries,
    error,
    errorMessage,
    setErorr,
    setErorrMessage,
  } = useRequest();

  const [filterdCountries, setFilterdCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    if (countries.length === 0) {
      fetchCountries(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders"
      ); //for some reason the first fetch doesn't set the countries array, so i make that runs untill the data is fetched
    }
    filterCountries(search, regions); //apply region filter when going back to this route
  }, [countries]);

  const filterCountries = (search, regions) => {
    let searchArray = [];
    if (search === "") {
      for (const key in countries) {
        searchArray.push({ ...countries[key] });
      }
      setFilterdCountries(searchArray);
    } else {
      for (const key in countries) {
        if (
          countries[key].officalName
            .toLowerCase()
            .match(search.toLowerCase()) ||
          countries[key].commonName.toLowerCase().match(search.toLowerCase())
        ) {
          searchArray.push({ ...countries[key] });
        }
      }
      if (searchArray.length === 0) {
        setErorr(true);
        setErorrMessage("Found no country.");
      } else {
        setErorr(false);
      }
    }
    let regionArray = [];
    if (regions.length > 0) {
      for (const key in searchArray) {
        for (const region in regions) {
          if (searchArray[key].region === regions[region]) {
            regionArray.push({ ...searchArray[key] });
          }
        }
      }
      if (regionArray.length === 0) {
        setErorr(true);
        setErorrMessage("Found no country.");
      } else {
        setErorr(false);
        setFilterdCountries(regionArray);
      }
    } else {
      setFilterdCountries(searchArray);
    }
  };

  useEffect(() => {
    filterCountries(search, regions);
  }, [search, regions]);

  let content = <></>;

  if (errorMessage === "Something went wrong, try refreshing the page.") {
    content = (
      <div className={`${classes.centerStatus} ${mode && classes.lightMode}`}>
        {errorMessage.toString()}
      </div>
    );
  } else if (loading) {
    content = (
      <div className={classes.centerStatus}>
        {mode ? (
          <Loader style={{ color: "var(--very-dark-blue-text)" }} />
        ) : (
          <Loader color="white" />
        )}
      </div>
    );
  } else {
    content = (
      <main className={classes.content}>
        <Filter
          setSearch={setSearch}
          filterCountries={filterCountries}
          mode={mode}
          setRegions={setRegions}
        ></Filter>
        {error ? (
          <div
            className={`${classes.centerStatus} ${mode && classes.lightMode}`}
          >
            {errorMessage.toString()}
          </div>
        ) : (
          <Countries countries={filterdCountries} mode={mode}></Countries>
        )}
      </main>
    );
  }
  return (
    <main className={`${classes.container} ${mode && classes.lightMode}`}>
      <div className={classes.content}>{content}</div>
    </main>
  );
}
