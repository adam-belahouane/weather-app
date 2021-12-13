import React, { useEffect, useState } from "react";
import { Container, InputGroup, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherAction, setSearchAction } from "../actions";
import { ReduxStore } from "../types/ReduxStore";
import CurrentWeather from "./CurrentWeather";
import DayForecast from "./DayForecast";
import WeeklyForecast from "./WeeklyForecast";

const MainPage = () => {
  const weather = useSelector((state) => state.weatherApi);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getWeatherAction(weather.search));
  }, [weather.search]);
  return (
    <Container>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="City"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onChange={(e : React.ChangeEvent<HTMLInputElement> ) => (dispatch(setSearchAction(e.target.value)))}
        />
      </InputGroup>

      {/* <DayForecast day={weather.content}/> */}
      <CurrentWeather currentWeather={weather.content} />
      <WeeklyForecast data={weather.content} />
    </Container>
  );
};

export default MainPage;
