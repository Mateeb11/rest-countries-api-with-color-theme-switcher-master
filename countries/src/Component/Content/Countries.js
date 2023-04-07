import { Link } from "react-router-dom";
import classes from "./Countries.module.css";

const Countries = ({ countries, mode }) => {
  return (
    <main className={`${classes.container} ${mode && classes.lightMode}`}>
      {countries.map((countrie) => (
        <Link
          key={countrie.id}
          to={countrie.officalName}
          className={classes.link}
        >
          <section className={`${classes.card} ${mode && classes.lightMode}`}>
            <img src={countrie.flag} alt={countrie.altText} />
            <div className={classes.info}>
              <p className={classes.name}>{countrie.officalName}</p>
              <div>
                <p className={classes.status}>
                  Population:
                  <span> {countrie.population.toLocaleString()}</span>
                </p>
                <p className={classes.status}>
                  Region:
                  <span> {countrie.region}</span>
                </p>
                <p className={classes.status}>
                  Capital:
                  <span> {countrie.capital}</span>
                </p>
              </div>
            </div>
          </section>
        </Link>
      ))}
    </main>
  );
};

export default Countries;
