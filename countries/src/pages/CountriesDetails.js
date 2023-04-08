import { useParams, Link, useNavigate } from "react-router-dom";
import ErrorPage from "./Error";
import useRequest from "../hooks/use-request";
import { useEffect } from "react";

import classes from "./CountriesDetails.module.css";

export default function CountriesDetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const {
    countries,
    loading,
    fetchCountries,
    error,
    errorMessage,
    setErorr,
    setErorrMessage,
  } = useRequest();

  useEffect(() => {
    fetchCountries(`https://restcountries.com/v3.1/name/${params.countryId}`);
  }, []);

  const getData = (feature, currencies = false) => {
    let content = "";
    if (currencies) {
      for (let i = 0; i < Object.keys(feature).length; i++) {
        content += feature[i].name + ", ";
      }
    } else {
      for (let i = 0; i < Object.keys(feature).length; i++) {
        content += feature[i] + ", ";
      }
    }

    return content.slice(0, -2);
  };

  let content = <></>;

  if (loading) {
    content = <p>loading</p>;
  } else {
    content = countries.length !== 0 && (
      <main className={classes.main}>
        <button onClick={() => navigate("..")}>back</button>
        <section className={classes.container}>
          <div className={classes.image}>
            <img src={countries[0].flag} alt={countries[0].altText} />
          </div>
          <section className={classes.countryInfo}>
            <p className={classes.countryName}>{countries[0].officalName}</p>
            <div className={classes.info}>
              <div>
                <p className={classes.status}>
                  Native Name:
                  <span> {countries[0].nativeName}</span>
                </p>
                <p className={classes.status}>
                  Population:
                  <span> {countries[0].population}</span>
                </p>
                <p className={classes.status}>
                  Region:
                  <span> {countries[0].region}</span>
                </p>
                <p className={classes.status}>
                  Sub Region:
                  <span> {countries[0].subregion}</span>
                </p>
                <p className={classes.status}>
                  Capital:
                  <span> {countries[0].capital}</span>
                </p>
              </div>
              <div>
                <p className={classes.status}>
                  Top Level Domain:
                  <span> {countries[0].tld}</span>
                </p>
                <p className={classes.status}>
                  Currencies:
                  <span> {getData(countries[0].currencies, true)}</span>
                </p>
                <p className={classes.status}>
                  Languages:
                  <span> {getData(countries[0].languages)}</span>
                </p>
              </div>
            </div>
            <button className={classes.border}>Hi</button>
          </section>
        </section>
      </main>
    );
  }

  return <>{content}</>;
}
