import { Link } from "react-router-dom";
import classes from "./button.module.css";

export default function Button(props) {
  return (
    <>
      <Link
        to={props.children !== "back" && `/${props.children}`}
        onClick={props.onClick}
      >
        <p>{props.children}</p>
      </Link>
    </>
  );
}
