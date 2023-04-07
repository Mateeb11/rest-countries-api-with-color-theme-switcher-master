import { useParams } from "react-router-dom";
import ErrorPage from "./Error";

export default function CountriesDetailsPage() {
  const params = useParams();
  return <>{params.countryId !== "p1" ? <ErrorPage /> : <h1>hi</h1>}</>;
}
