import React, { useEffect, useState } from "react";
import { Container, InputGroup, FormControl, Row, Col } from "react-bootstrap";
import { useSelector, useDispatch, DefaultRootState, RootStateOrAny } from "react-redux";
import { getWeatherAction, setSearchAction } from "../actions";
import { ReduxStore } from "../types/ReduxStore";
import { Data } from "../types/TodaysData";
import CurrentWeather from "./CurrentWeather";
import DayForecast from "./DayForecast";
import WeeklyForecast from "./WeeklyForecast";

const MainPage = () => {
  const weather = useSelector((state: RootStateOrAny) => state.weatherApi);
  const dispatch = useDispatch();
  const [locationValue, setLocationValue] = useState('')
  const [todaysWeather, setTodaysWeather] = useState<Data[] | []>([])
  const apiKey = process.env.REACT_APP_API_KEY;
  const ApiUrl = process.env.REACT_APP_API_URL

  const getTodaysWeather = async () => {
    try {
      const response = await fetch(`${ApiUrl}/forecast?q=${locationValue.length > 2 ? locationValue : "london"}&units=metric&cnt=5&appid=${apiKey}`)
      if(response.ok) {
        let data = await response.json()
        setTodaysWeather(data.list)
        
      }
    } catch (error) {
    }
  }
  
  useEffect(() => {
    dispatch(getWeatherAction(locationValue));
    console.log(weather);
    getTodaysWeather()
    console.log(todaysWeather);
  }, [weather.search]);
  useEffect(() => {
    dispatch(getWeatherAction(weather.search))
    
  }, [])
  return (
    <Container>
      <Row>
        <Col xs={12}>
          <div className="mt-3 search-bar-container" >
            <input
              placeholder="What's the weather like in..."
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              className="search-bar"
              value={locationValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => (setLocationValue(e.target.value))}
              onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key == 'Enter') {
                  dispatch(setSearchAction(locationValue));
                }
              }}
            />
            <svg className="search-icon" viewBox="0 0 512 512" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M349.714 347.937l93.714 109.969-16.254 13.969-93.969-109.969q-48.508 36.825-109.207 36.825-36.826 0-70.476-14.349t-57.905-38.603-38.603-57.905-14.349-70.476 14.349-70.476 38.603-57.905 57.905-38.603 70.476-14.349 70.476 14.349 57.905 38.603 38.603 57.905 14.349 70.476q0 37.841-14.73 71.619t-40.889 58.921zM224 377.397q43.428 0 80.254-21.461t58.286-58.286 21.461-80.254-21.461-80.254-58.286-58.285-80.254-21.46-80.254 21.46-58.285 58.285-21.46 80.254 21.46 80.254 58.285 58.286 80.254 21.461z" fill="currentcolor"></path>
            </svg>
          </div>
        </Col>
      </Row>
      {/* <DayForecast day={weather.content}/> */}
      <CurrentWeather WeatherList={todaysWeather}/>
    </Container>
  );
};

export default MainPage;
