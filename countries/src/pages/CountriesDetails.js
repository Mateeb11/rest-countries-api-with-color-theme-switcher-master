import { useParams, Link, useNavigate } from "react-router-dom";
import ErrorPage from "./Error";
import useRequest from "../hooks/use-request";
import { useEffect } from "react";

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

  let content = <></>;

  if (loading) {
    content = <p>loading</p>;
  } else {
    content = countries.length !== 0 && (
      <p>
        {countries[0].officalName}{" "}
        <button onClick={() => navigate("..")}>back</button>
      </p>
    );
  }

  return <>{content}</>;
}
