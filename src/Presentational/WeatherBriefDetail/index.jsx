import styles from "./style.module.css";

const WeatherDetails = ({
    name,
    description,
    iconURL,
    temp,
    country,
    unit
}) =>{
    const tempUnit = unit === "metric" ? "°C" : "°F";
    return(
        <div className={styles.weatherDesc}>
                <span>
                    <h3>{`${name}, ${country}`}</h3>
                    <img src={iconURL} alt="weatherIcon" />
                    <h3>{description}</h3>
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