import { useEffect, useState } from "react";

const useRequest = () => {
  const [error, setErorr] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErorrMessage] = useState("");
  const [countries, setCountries] = useState([]);

  //   useEffect(()=> {

  //   })
  const fetchCountries = async (url) => {
    try {
      setLoading(true);
      const response = await fetch(url);

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

      setLoading(false);
      return loadedCountries;
    } catch (error) {
      if (error.message === "Failed to fetch")
        setErorrMessage("Failed to fetch data, try refreshing the page.");
      else setErorrMessage(error.message);
      setErorr(true);
    }
  };

  return {
    countries,
    loading,
    fetchCountries,
    error,
    errorMessage,
    setErorr,
    setErorrMessage,
  };
};

export default useRequest;