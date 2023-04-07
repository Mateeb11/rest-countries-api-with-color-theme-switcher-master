import { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";

import Loader from "react-loading-indicators";

import Countries from "./Countries";
import Filter from "./Filter";

import classes from "./Content.module.css";

export default function Content() {
  const mode = useSelector((state) => state.mode.colorMode);

  const [countries, setCountries] = useState([]);
  const [filterdCountries, setFilterdCountries] = useState([]);

  const [search, setSearch] = useState("");
  const [regions, setRegions] = useState([]);

  const [erorr, setErorr] = useState(false);
  const [errorMessage, setErorrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCountries = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders"
      );

      const data = await response.json();
      const loadedCountries = [];
      for (const key in data) {
        const nativeName = data[key].name.nativeName;
        loadedCountries.push({
          id: key,
          flag: data[key].flags.png,
          altText: data[key].flags.alt,
          officalName: data[key].name.official,
          nativeName:
            Object.keys(data[key].name.nativeName).length === 0
              ? "None"
              : Object.values(nativeName)[0].official,
          commonName: data[key].name.common,
          population: data[key].population,
          region: data[key].region,
          subregion: data[key].subregion,
          capital: data[key].capital,
          tld: data[key].tld,
          currecies: data[key].BBD,
          // languages: data[key].div,
          borders: data[key].borders,
        });
      }

      setErorr(false);
      setCountries(loadedCountries);
      setFilterdCountries(loadedCountries);
      setLoading(false);
    } catch (error) {
      if (error.message === "Failed to fetch")
        setErorrMessage("Something went wrong, try refreshing the page.");
      else setErorrMessage(error.message);
      setErorr(true);
    }
  });

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
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries(search, regions);
    console.log("hi");
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
        {erorr ? (
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
