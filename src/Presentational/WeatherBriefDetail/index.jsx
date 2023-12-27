import styles from "./style.module.css";

const WeatherDetails = ({
    name,
    description,
    iconURL,
    temp,
    country,
    unit,
}) => {
    const tempUnit = unit === "metric" ? "°C" : "°F";
    return (
        <div className={styles.weatherDesc}>
            <span>
                <h2>{`${name}, ${country}`}</h2>
                <p>{description}</p>
                <img
                    src={iconURL}
                    alt="weatherIcon"
                    style={{ color: "#CFE2F3" }}
                    className={styles.icon}
                />
            </span>
            <span>
                <h1>
                    {`${temp} ${tempUnit}`}
                </h1>
            </span>
        </div>
    )
}

export default WeatherDetails;