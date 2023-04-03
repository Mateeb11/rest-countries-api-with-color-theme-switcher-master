import { useState, useEffect, useCallback } from "react";
import Loader from "react-loading-indicators";

import Countries from "./Countries";
import Filter from "./Filter";

import classes from "./Content.module.css";

export default function Content({ mode }) {
  const [countries, setCountries] = useState([]);
  const [filterdCountries, setFilterdCountries] = useState([]);

  const [search, setSearch] = useState("");
  const [region, setRegion] = useState([]);

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

  const filterCountries = (search, region) => {
    let tempArray = [];
    if (search === "") {
      setFilterdCountries(countries);
    } else {
      for (const key in countries) {
        if (
          countries[key].officalName
            .toLowerCase()
            .match(search.toLowerCase()) ||
          countries[key].commonName.toLowerCase().match(search.toLowerCase())
        ) {
          tempArray.push({ ...countries[key] });
        }
      }
      if (tempArray.length === 0) {
        setErorr(true);
        setErorrMessage("Found no country.");
      } else {
        setErorr(false);
      }
      setFilterdCountries(tempArray);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    filterCountries(search);
  }, [search]);

  let content = (
    <>
      <Filter setSearch={setSearch} setRegion={setRegion}></Filter>
      <Countries countries={countries}></Countries>
    </>
  );

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
      <>
        <Filter
          setSearch={setSearch}
          filterCountries={filterCountries}
          mode={mode}
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
      </>
    );
  }
  return (
    <main className={classes.container}>
      <div className={classes.content}>{content}</div>
    </main>
  );
}
