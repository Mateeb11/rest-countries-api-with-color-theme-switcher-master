import { useState, useEffect, useCallback } from "react";

import Countries from "./Countries";
import Filter from "./Filter";

import classes from "./Content.module.css";

export default function Content() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  const fetchCountries = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Error");
      } else if (response.status === 404) {
        throw new Error("Error 404");
      }

      const data = await response.json();
      // console.log(data[0]);
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

      setCountries(loadedCountries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const url =
      search === ""
        ? "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders"
        : `https://restcountries.com/v3.1/name/${search}?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders`;
    fetchCountries(url);
  }, [search]);
  return (
    <main className={classes.container}>
      <Filter setSearch={setSearch}></Filter>
      <Countries countries={countries}></Countries>
    </main>
  );
}
