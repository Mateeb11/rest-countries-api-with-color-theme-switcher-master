import { Link } from "react-router-dom";
import classes from "./button.module.css";
import { MaterialSymbol } from "react-material-symbols";
import { useSelector } from "react-redux";

export default function Button(props) {
  const mode = useSelector((state) => state.mode.colorMode);
  return (
    <>
      <Link
        to={props.children !== "Back" && `/${props.link}`}
        onClick={props.onClick}
        className={`${classes.button} ${mode && classes.lightMode}`}
      >
        {props.children === "Back" && (
          <MaterialSymbol
            icon="keyboard_backspace"
            style={
              !mode
                ? {
                    color: "var(--white)",
                  }
                : {
                    color: "var(--very-dark-blue-text)",
                  }
            }
            size={20}
          />
        )}

        {props.children}
      </Link>
    </>
  );
}
