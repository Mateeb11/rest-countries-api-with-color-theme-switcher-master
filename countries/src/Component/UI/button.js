import { Link } from "react-router-dom";
import classes from "./button.module.css";
import { MaterialSymbol } from "react-material-symbols";

export default function Button(props) {
  return (
    <>
      <Link
        to={props.children !== "Back" && `/${props.children}`}
        onClick={props.onClick}
        className={classes.button}
      >
        {props.children === "Back" && (
          <MaterialSymbol
            icon="keyboard_backspace"
            style={{
              color: "var(--white)",
            }}
            size={20}
          />
        )}

        {props.children}
      </Link>
    </>
  );
}
