import styles from "./style.module.css";

const WeatherInputForm = ({
    city,
    unit,
    onSubmit,
    onChangeUnit,
    onCityInputChange
}) => {
    return (
        <form onSubmit={onSubmit} className={styles.weatherInputForm}>
            <label
                className={styles.label}
                htmlFor={"city"}
            >City Name</label>
            <input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={onCityInputChange}
                placeholder="Enter City Name"
                className={styles.input}
            />
            <button
                type="submit"
                className={styles.btn}
            >Check Weather</button>
            <label 
                className={styles.label}
            > in </label>
            <button
                type="button"
                className={styles.unitBtn}
                onClick={onChangeUnit}
            >
                {unit === "metric" ? "°C" : "°F"}
            </button>
        </form>
    )
}

export default WeatherInputForm;