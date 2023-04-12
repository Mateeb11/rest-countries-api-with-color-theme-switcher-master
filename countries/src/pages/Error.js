import classes from "./Error.module.css";

import { useSelector } from "react-redux";

export default function ErrorPage({
  status = 404,
  message = "Page not found",
}) {
  const mode = useSelector((state) => state.mode.colorMode);
  return (
    <div className={`${classes.error} ${mode && classes.lightMode}`}>
      <h1>{status}</h1>
      <p>{message}</p>
    </div>
  );
}
