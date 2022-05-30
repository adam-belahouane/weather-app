import { useEffect, useState } from "react";
import { RootStateOrAny, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { DailyForecast } from "../types/TodaysData";
import DayForecast from "./DayForecast";

const WeeklyForecast = () => {
  const [weekly, setWeekly] = useState<DailyForecast[] | []>([]);

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
        setWeekly(data.daily);
      } else {
        console.log("no data");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
      getWeeklyWeather()
      console.log(weekly);
      
  }, [data])
  return (
    <>
      {/* <div className="weekly-weather-container row"> */}
      
        {weekly.length > 0 ?
        weekly.map((day, index) => <DayForecast day={day} key={index} /> ):
        <></>}
      
      {/* </div> */}
      </>
  );
};

export default WeeklyForecast;
