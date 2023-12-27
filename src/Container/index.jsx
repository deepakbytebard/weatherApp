import { useEffect, useState } from "react";
// Asset images
import hotWeather from "@weatherAssets/hotWeather.jpg"
import coldWeather from "@weatherAssets/coldWeather.jpg"

// presentation component
import WeatherInputForm from "@presentational/WeatherForm";
import WeatherDetails from "@presentational/WeatherBriefDetail";
import WeatherDescription from "@presentational/WeatherDescription";
import FallBackUI from "@presentational/FallBackUI";

// services to fetch weather data via API
import { getFormattedWeatherData } from "@container/weatherServices";

import styles from "./style.module.css";

const WeatherContainer = () => {
    const [city, setCity] = useState(undefined);
    const [loading, setLoading] = useState(false)
    const [weather, setWeather] = useState(null);
    const [unit, setUnit] = useState("metric"); //unit to measure temperature
    const [bg, setBg] = useState(hotWeather); //background image on basis of temperature
    const [apiError, setApiError] = useState({
        isError: false,
        message: ""
    })
    const [error, setError] = useState({
        isValid: true,
        message: ""
    })

    useEffect(() => {
        // get data stored in local storage and parse it
        let weatherInfo = JSON.parse(localStorage.getItem('weatherInfo'))

        // if weatherinfo is in localstorage, then fetch data of last city checked 
        if (weatherInfo?.city) {
            setCity(weatherInfo.city)
            setUnit(weatherInfo.unit)
            fetchWeatherData(weatherInfo.city, weatherInfo.unit);
        }
    }, [])

    // to fetch weather data 
    const fetchWeatherData = async (selectedCity = city, tempUnit = unit) => {
        setLoading(true)
        const data = await getFormattedWeatherData(selectedCity, tempUnit);
        if (data.error) {
            setApiError({
                isError: true,
                message: data.message
            })
            setLoading(false)
            return;
        }
        let weatherInfo = {
            city: selectedCity,
            unit: tempUnit
        }
        // update local storage with the new city searched by user
        localStorage.setItem('weatherInfo', JSON.stringify(weatherInfo))
        setWeather(data);

        // dynamic bg
        const thresold = tempUnit === "metric" ? 20 : 68;
        if (data.temp <= thresold) {
            setBg(coldWeather);
        }
        else { setBg(hotWeather) };
        // setScreen("data")
        setApiError({
            isError: false,
            message: ""
        })
        setLoading(false)
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
        fetchWeatherData(city, unit === "metric" ? "imperial" : "metric")
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


    let enterCityName = ((city === undefined || weather === null) && !apiError.isError) ? true : false

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
                    loading={loading}
                />
            </span>


            <>{(enterCityName || loading || apiError.isError)
                ?
                <FallBackUI
                    city={city}
                    addCityUi={enterCityName}
                    loadingUi={loading}
                    errorMessage={apiError.message}
                />
                :
                <>
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
                </>
            }</>

        </div>
    )
}
// }

export default WeatherContainer;