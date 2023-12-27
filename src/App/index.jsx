import hotWeather from "../assets/WeatherAssets/hotWeather.jpg"
import coldWeather from "../assets/WeatherAssets/coldWeather.jpeg"
import styles from "./style.module.css";

const App = () => {
    return (
        <div className={styles.appContainer} style={{backgroundImage:`url(${hotWeather})`}}>
            Weather App
        </div>
    )
}

export default App;