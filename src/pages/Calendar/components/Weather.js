import React, { memo, useEffect, useState } from "react";
import { GiWaterDrop } from "react-icons/gi";
import { AiOutlineClockCircle } from "react-icons/ai";
import * as dateFns from "date-fns";

import { WeatherInfoContainer } from '../Calendar.styled'
import { fetchWeatherByCityFx } from "../../../store";

const Weather = ({ reminder }) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetchWeatherByCityFx({ city: reminder.city })
      .then((data) =>
        setData(
          data?.list.filter(
            (forecast, index) =>
              forecast.dt_txt.split(" ").shift() ===
              dateFns.format(reminder.date, "yyyy-MM-dd") && index % 2 === 0
          )
        )
      )
      .catch((error) => setError(error.response.data.message))
      .finally(() => setIsLoading(false));
  }, [reminder]);

  if (isLoading) return <div>fetching forecast...</div>;

  if (error) return <div style={{ color: 'red' }}>Error to fetch forecast: {error}</div>;

  if (!data?.length)
    return <div>Forecast cannot be obtained for this day.</div>;
  
  return (
    <WeatherInfoContainer>
      {data.map((forecast) => (
        <div style={{ margin: 0 }} key={forecast.dt}>
          <div><AiOutlineClockCircle /> {dateFns.format(new Date(forecast.dt_txt), "HH:mm")}</div>
          <div>{forecast.main.temp} °C</div>
          <div><GiWaterDrop /> {forecast.main.humidity}% </div>
          <div>{forecast.weather[0].main}</div>
        </div>
      ))}
    </WeatherInfoContainer>
  );
};

export default memo(Weather);
