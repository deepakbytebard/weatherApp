import styles from "./style.module.css";

const WeatherInputForm = ({
    city,
    unit,
    loading,
    onSubmit,
    onChangeUnit,
    onCityInputChange
}) => {

    let disableBtn = (city === undefined || city === "" || loading) ? true : false
    return (
        <form onSubmit={onSubmit} className={styles.weatherInputForm}>
            <label
                className={styles.label}
                htmlFor={"city"}
            >City Name</label>
            <input
                key={"city"}
                type="text"
                name="city"
                id="city"
                value={city || ""}
                maxLength={50}
                onChange={onCityInputChange}
                placeholder="Enter City Name"
                className={styles.input}
            />
            <span className={styles.btnSection}>
                <button
                    type="submit"
                    disabled={disableBtn}
                    className={`${styles.submitBtn} ${styles.btn} ${disableBtn && styles.disabledBtn}`}
                >Check Weather</button>
                <label
                    className={styles.label}
                > in </label>
                <button
                    type="button"
                    disabled={disableBtn}
                    className={`${styles.unitBtn} ${styles.btn} ${disableBtn && styles.disabledBtn}`}
                    onClick={onChangeUnit}
                >
                    {unit === "metric" ? "°C" : "°F"}
                </button>
            </span>
        </form>
    )
}

export default WeatherInputForm;