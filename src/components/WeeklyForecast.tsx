import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";

const WeeklyForecast = () => {
  const [weekly, setWeekly] = useState(null);

  const data = useSelector((state: RootStateOrAny) => state.weatherApi.content);

  const apiKey = process.env.REACT_APP_API_KEY
  const lat = data.coord.lat
  const lon = data.coord.lon

  const getWeeklyWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${apiKey}&units=metric`
      );
      if (response.ok) {
        const data = await response.json();
        setWeekly(data);
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      getWeeklyWeather()
  }, [data])
  return <></>;
};

export default WeeklyForecast;
