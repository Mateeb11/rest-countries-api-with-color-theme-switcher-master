import { useState, useEffect, useCallback } from "react";

import classes from "./Countries.module.css";

const Countries = () => {
  const [countries, setCountries] = useState([]);

  const fetchCountries = useCallback(async () => {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,subregion,capital,tld,currencies,languages,borders"
      );
      if (!response.ok) {
        throw new Error("Error");
      }
      const data = await response.json();
      console.log(data[0]);
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
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);
  return (
    <main className={classes.container}>
      {countries.map((countrie) => (
        <section key={countrie.id} className={classes.card}>
          <img src={countrie.flag} alt={countrie.altText} />
          <div className={classes.info}>
            <p className={classes.name}>{countrie.officalName}</p>
            <div>
              <p className={classes.status}>
                <span>Population: </span>
                {countrie.population}
              </p>
              <p className={classes.status}>
                <span>Region: </span>
                {countrie.region}
              </p>
              <p className={classes.status}>
                <span>Capital: </span>
                {countrie.capital}
              </p>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Countries;
