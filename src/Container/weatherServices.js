// get api key from .env file
const API_KEY = import.meta.env.VITE_API_KEY;
// getting icon respective to city
const makeIconURL = (iconId) =>
    `http://openweathermap.org/img/w/${iconId}.png`

//   constructing URL for own API
const getFormattedWeatherData = async (city, units = "metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const data = await fetch(URL)
        .then((res) => res.json())
        .then((data) => data);

    // return error message in case api get failed
    if (data.message) {
        return { error: true, message: data.message }
    }
    // destructuring weather data
    const {
        weather,
        main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
        wind: { speed },
        sys: { country },
        name,
    } = data;

    const { description, icon } = weather[0];

    return {
        description,
        iconURL: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    };
};

export { getFormattedWeatherData };
