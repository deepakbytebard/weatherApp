import WeatherContainer from "../Container";
import styles from "./style.module.css"
const App = () => {
    return (
        <div className={styles.appContainer}>
            <WeatherContainer/>
        </div>
    )
}

export default App;