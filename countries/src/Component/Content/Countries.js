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
      ))}
    </main>
  );
};

export default Countries;
