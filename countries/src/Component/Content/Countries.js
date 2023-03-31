import classes from "./Countries.module.css";

const Countries = ({ countries }) => {
  return (
    <main className={classes.container}>
      {countries.map((countrie) => (
        <section key={countrie.id} className={classes.card}>
          <img src={countrie.flag} alt={countrie.altText} />
          <div className={classes.info}>
            <p className={classes.name}>{countrie.officalName}</p>
            <div>
              <p className={classes.status}>
                <span>Population: </span>
                {countrie.population}
              </p>
              <p className={classes.status}>
                <span>Region: </span>
                {countrie.region}
              </p>
              <p className={classes.status}>
                <span>Capital: </span>
                {countrie.capital}
              </p>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
};

export default Countries;
