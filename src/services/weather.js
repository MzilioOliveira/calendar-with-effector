import axios from "axios";

export const fetchWeatherByCity = async ({ city }) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`
  const { data } = await axios({
    method: "GET",
    url
  });
  return data
};
