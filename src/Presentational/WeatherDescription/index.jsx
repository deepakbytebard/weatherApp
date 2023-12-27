
import { FaArrowUp, FaArrowDown, FaWind } from "react-icons/fa";
import { BiHappy } from "react-icons/bi";
import { MdCompress, MdOutlineWaterDrop } from "react-icons/md";

import styles from "./style.module.css";

const WeatherDescription = ({
    name,
    description,
    iconURL,
    temp,
    feels_like,
    temp_min,
    temp_max,
    pressure,
    humidity,
    speed,
    country,
    unit
}) => {

    const tempUnit = unit === "metric" ? "°C" : "°F";
    const windUnit = unit === "metric" ? "m/s" : "m/h";


    const cards = [
        {
            id: "temp_min",
            icon: <FaArrowDown />,
            title: "min",
            data: temp_min?.toFixed(),
            unit: tempUnit,
        },
        {
            id: "temp_max",
            icon: <FaArrowUp />,
            title: "max",
            data: temp_max?.toFixed(),
            unit: tempUnit,
        },
        {
            id: "feels_like",
            icon: <BiHappy />,
            title: "feels like",
            data: feels_like?.toFixed(),
            unit: tempUnit,
        },
        {
            id: "pressure",
            icon: <MdCompress />,
            title: "pressure",
            data: pressure,
            unit: "hPa",
        },
        {
            id: "humidity",
            icon: <MdOutlineWaterDrop />,
            title: "humidity",
            data: humidity,
            unit: "%",
        },
        {
            id: "speed",
            icon: <FaWind />,
            title: "wind speed",
            data: speed?.toFixed(),
            unit: windUnit,
        },
    ];

    return (
        <div className={styles.descCardSection}>
            {cards.map(({ id, title, data, unit, icon }) => (
                <span key={id} className={styles.descCard}>
                    <span className={styles.cardIcon}>
                        {" "}
                        {icon}
                        <small>{title}</small>
                    </span>
                    <h2>{`${data} ${unit}`}</h2>
                </span>
            ))}
        </div>
    )
}

export default WeatherDescription;