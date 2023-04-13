import { useParams, useNavigate } from "react-router-dom";
import useRequest from "../hooks/use-request";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import classes from "./CountriesDetails.module.css";
import Button from "../Component/UI/button";
import LoadingIndicator from "../Component/UI/Loader";

export default function CountriesDetailsPage() {
  const mode = useSelector((state) => state.mode.colorMode);

  const params = useParams();
  const navigate = useNavigate();
  const { countries, borders, loading, setData, error, errorMessage } =
    useRequest();

  useEffect(() => {
    setData(`https://restcountries.com/v3.1/name/${params.countryId}`);
  }, [params.countryId]);

  const getData = (feature, currencies = false) => {
    let content = "";
    if (feature === "None") return "None";
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
  if (error) {
    content = (
      <div className={`${classes.centerStatus} ${mode && classes.lightMode}`}>
        {errorMessage.toString()}
      </div>
    );
  } else if (loading) {
    content = <LoadingIndicator mode={mode}></LoadingIndicator>;
  } else {
    content = countries.length !== 0 && (
      <main className={`${classes.main} ${mode && classes.lightMode}`}>
        <Button onClick={() => navigate(-1)}>Back</Button>
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
                  <span> {countries[0].population.toLocaleString()}</span>
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
            <div className={classes.borderCountries}>
              <p>Border Countires:</p>
              <div className={classes.borderCountries}>
                {borders.length === 0
                  ? "None"
                  : borders.map((element, index) => {
                      return (
                        <Button key={index} link={element.country[1]}>
                          {element.country[0]}
                        </Button>
                      );
                    })}
              </div>
            </div>
          </section>
        </section>
      </main>
    );
  }

  return <>{content}</>;
}
