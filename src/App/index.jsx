import WeatherContainer from "@container/index.jsx";
import styles from "./style.module.css"
const App = () => {
    return (
        <div className={styles.appContainer}>
            <WeatherContainer/>
        </div>
    )
}

export default App;