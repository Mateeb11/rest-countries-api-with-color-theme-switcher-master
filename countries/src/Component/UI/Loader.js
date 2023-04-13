import Loader from "react-loading-indicators";

import classes from "./Loader.module.css";

export default function LoadingIndicator({ mode }) {
  return (
    <div className={`${classes.centerStatus} ${mode && classes.lightMode}`}>
      {mode ? (
        <Loader style={{ color: "var(--very-dark-blue-text)" }} />
      ) : (
        <Loader color="white" />
      )}
    </div>
  );
}
