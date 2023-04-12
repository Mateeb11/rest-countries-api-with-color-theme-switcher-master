import { useEffect, useState } from "react";

const useRequest = () => {
  const [error, setErorr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErorrMessage] = useState("");
  const [countries, setCountries] = useState([]);
  const [borders, setBorders] = useState([]);

  const fetchCountries = async (url) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error();
      }
      return await response.json();
      // const loadedBorders = [];

      // if (loadedCountries[0].borders !== undefined) {
      //   for (let i = 0; i < loadedCountries[0].borders.length; i++) {
      //     try {
      //       const response = await fetch(
      //         `https://restcountries.com/v3.1/alpha/${loadedCountries[0].borders[i]}`
      //       );
      //       const data = await response.json();

      //       loadedBorders.push({
      //         country: data[0].name.common,
      //       });

      //       setBorders(loadedBorders);
      //     } catch {}
      //   }
      //   setLoading(false);
      // }

      // setErorr(false);
      // setCountries(loadedCountries);

      // setLoading(false);
    } catch (error) {
      if (error.message === "Failed to fetch")
        setErorrMessage("Failed to fetch data, try refreshing the page.");
      else setErorrMessage("Page not found");
      setErorr(true);
    }
  };

  const setData = async (url) => {
    setLoading(true);
    const data = await fetchCountries(url);

    const loadedCountries = [];
    for (const key in data) {
      loadedCountries.push({
        id: key,
        flag: data[key].flags.png,
        altText: data[key].flags.alt,
        officalName:
          data[key].name.official === undefined
            ? "None"
            : data[key].name.official,
        nativeName:
          data[key].name.nativeName === undefined ||
          Object.values(data[key].name.nativeName).length === 0
            ? "None"
            : Object.values(data[key].name.nativeName)[0].official,
        commonName: data[key].name.common,
        population:
          data[key].population === undefined ? "None" : data[key].population,
        region: data[key].region,
        subregion:
          data[key].subregion === undefined ? "None" : data[key].subregion, //string
        capital: data[key].capital === undefined ? "None" : data[key].capital, //array
        tld: data[key].tld, //array
        currencies:
          data[key].currencies === undefined
            ? "None"
            : Object.values(data[key].currencies), //object
        languages:
          data[key].languages === undefined
            ? "None"
            : Object.values(data[key].languages),
        borders: data[key].borders, //array
      });
    }
    const loadedBorders = [];

    try {
      {
        if (loadedCountries[0].borders !== undefined) {
          for (let i = 0; i < loadedCountries[0].borders.length; i++) {
            const response = await fetch(
              `https://restcountries.com/v3.1/alpha/${loadedCountries[0].borders[i]}`
            );
            const data = await response.json();

            loadedBorders.push({
              country: [data[0].name.common, data[0].name.official],
            });

            setBorders(loadedBorders);
          }
          setLoading(false);
        }
      }
    } catch {}

    setCountries(loadedCountries);
    setLoading(false);
  };

  return {
    countries,
    borders,
    loading,
    setLoading,
    fetchCountries,
    error,
    errorMessage,
    setErorr,
    setErorrMessage,
    setData,
  };
};

export default useRequest;
