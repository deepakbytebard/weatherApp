import hotWeather from "../assets/WeatherAssets/hotWeather.jpg"
import coldWeather from "../assets/WeatherAssets/coldWeather.jpeg"
import WeatherInputForm from "../Presentational/WeatherForm";
import WeatherDetails from "../Presentational/WeatherBriefDetail";
import WeatherDescription from "../Presentational/WeatherDescription";
import { getFormattedWeatherData } from "./weatherServices";

import styles from "./style.module.css";
import { useEffect, useState } from "react";

const isValidInput = (input) => {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(input);
};
const WeatherContainer = () => {
    const [city, setCity] = useState("Ranchi");
    const [weather, setWeather] = useState(null);
    const [unit, setUnit] = useState("metric");
    const [bg, setBg] = useState(hotWeather);
    const [error, setError] = useState({
        isValid: true,
        message: ""
    })

    useEffect(() => {
        fetchWeatherData();
    }, [])

    const fetchWeatherData = async () => {
        const data = await getFormattedWeatherData(city, unit);
        setWeather(data);

        // dynamic bg
        const thresold = unit === "metric" ? 20 : 68;
        if (data.temp <= thresold) {
            setBg(coldWeather);
        }
        else { setBg(hotWeather) };
    }

    // on change of city in input field
    const handleCityInputChange = (e) => {
        const { value } = e.target;
        const sanitizedValue = value.replace(/[^a-zA-Z\s]/g, '')
        if (sanitizedValue === value) {
            setCity(value);
            if (!error.isValid) {
                setError({
                    isValid: true,
                    message: ""
                })
            }
        } else {
            setError({
                isValid: false,
                message: "Special characters are not allowed."
            })
        }

    }

    // onchange of temperature measuring unit
    const handleTempUnit = () => {
        setUnit(prev => {
            return prev === "metric" ? "imperial" : "metric"
        })
    }

    // on submit of city name
    const onSubmit = (e) => {
        e.preventDefault();
        if (city.trim().length > 0) {
            fetchWeatherData()
        } else {
            setError({
                isValid: false,
                message: "Please enter city name."
            })
        }
    }
    return (
        <div className={styles.weatherContainer} style={{ backgroundImage: `url(${bg})` }}>
            <span className={styles.weatherInputForm}>
                <WeatherInputForm
                    city={city}
                    unit={unit}
                    onSubmit={onSubmit}
                    onChangeUnit={handleTempUnit}
                    onCityInputChange={handleCityInputChange}
                    error={error}
                />
            </span>
            <span className={styles.weatherBriefDesc}>
                <WeatherDetails
                {...weather}
                unit={unit}
                />
            </span>
            <span className={styles.weatherDesc}>
                <WeatherDescription
                    {...weather}
                    unit={unit}
                />
            </span>

        </div>
    )
}

export default WeatherContainer;