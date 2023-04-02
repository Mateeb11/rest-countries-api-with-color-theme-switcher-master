import { useState, useEffect, useCallback } from "react";
import Loader from "react-loading-indicators";

import Countries from "./Countries";
import Filter from "./Filter";

import classes from "./Content.module.css";

export default function Content({ mode }) {
  const [countries, setCountries] = useState([]);

  const [search, setSearch] = useState("");

  const [erorr, setErorr] = useState(false);
  const [errorMessage, setErorrMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCountries = useCallback(async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url, { method: "GET" });

      if (!response.ok) {
        if (response.statusText === "Not Found") {
          throw new Error("Found no country.");
        }
      }

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
      // const nativeName = data[0].name.nativeName;
      // loadedCountries.push({
      //   id: 0,
      //   flag: data[0].flags.png,
      //   altText: data[0].flags.alt,
      //   officalName: data[0].name.official,
      //   nativeName: Object.values(nativeName)[0].official,
      //   population: data[0].population,
      //   region: data[0].region,
      //   subregion: data[0].subregion,
      //   capital: data[0].capital,
      //   tld: data[0].tld,
      //   currencies: data[0].currencies.BBD.name,
      //   languages: data[0].languages.eng,
      //   borders: data[0].borders || "none",
      // });
      setErorr(false);
      setCountries(loadedCountries);

      setLoading(false);
    } catch (error) {
      if (error.message === "Failed to fetch")
        setErorrMessage("Something went wrong, try refreshing the page.");
      else setErorrMessage(error.message);
      setErorr(true);
    }
  });

  const filterCountries = () => {
    let tempArray = countries.filter((countrie) => {
      if (countrie.region === "Africa") return countrie;
    });

    setCountries(tempArray);
  };

  useEffect(() => {
    const url =
      search === ""
        ? "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders"
        : `https://restcountries.com/v3.1/name/${search}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`;
    fetchCountries(url);
  }, [search]);

  let content = (
    <>
      <Filter setSearch={setSearch}></Filter>
      <Countries countries={countries}></Countries>
    </>
  );

  if (erorr) {
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
    content = <Countries countries={countries} mode={mode}></Countries>;
  }
  return (
    <main className={classes.container}>
      <Filter
        setSearch={setSearch}
        filterCountries={filterCountries}
        mode={mode}
      ></Filter>

      <div className={classes.content}>{content}</div>
    </main>
  );
}
