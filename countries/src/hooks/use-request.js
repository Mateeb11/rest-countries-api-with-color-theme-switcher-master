import { useEffect, useState } from "react";

const useRequest = () => {
  const [error, setErorr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErorrMessage] = useState("");
  const [countries, setCountries] = useState([]);
  const [borders, setBorders] = useState([]);

  //   useEffect(()=> {

  //   })
  const fetchCountries = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);

      const data = await response.json();
      const loadedCountries = [];
      for (const key in data) {
        loadedCountries.push({
          id: key,
          flag: data[key].flags.png,
          altText: data[key].flags.alt,
          officalName: data[key].name.official,
          nativeName:
            Object.keys(data[key].name.nativeName).length === 0
              ? "None"
              : Object.values(data[key].name.nativeName)[0].official,
          commonName: data[key].name.common,
          population: data[key].population,
          region: data[key].region,
          subregion: data[key].subregion, //string
          capital:
            Object.keys(data[key].capital).length === 0
              ? "None"
              : data[key].capital, //array
          tld: data[key].tld, //array
          currencies: { ...Object.values(data[key].currencies) }, //object
          languages: { ...Object.values(data[key].languages) },
          borders: data[key].borders, //array
        });
      }
      const loadedBorders = [];

      if (loadedCountries[0].borders !== undefined) {
        for (let i = 0; i < loadedCountries[0].borders.length; i++) {
          try {
            const response = await fetch(
              `https://restcountries.com/v3.1/alpha/${loadedCountries[0].borders[i]}`
            );
            const data = await response.json();

            loadedBorders.push({
              country: data[0].name.common,
            });

            setBorders(loadedBorders);
          } catch {}
        }
      }

      setErorr(false);
      setCountries(loadedCountries);

      setLoading(false);
    } catch (error) {
      if (error.message === "Failed to fetch")
        setErorrMessage("Failed to fetch data, try refreshing the page.");
      else setErorrMessage(error.message);
      setErorr(true);
    }
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
  };
};

export default useRequest;
