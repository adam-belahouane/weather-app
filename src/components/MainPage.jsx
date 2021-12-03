import { useEffect, useState } from "react";
import { Container, InputGroup, FormControl } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { getWeatherAction, setSearchAction } from "../actions";
import CurrentWeather from "./CurrentWeather";
import DayForecast from "./DayForecast";

const MainPage = () => {
    const [eightDayData, setEightDayData] = useState(null)
  const weather = useSelector((state) => state.weatherApi);
  const dispatch = useDispatch();

  const apiKey = process.env.REACT_APP_API_KEY

  const weatherFor8 = async(search) => {
      try {
          const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${search}&cnt=8&appid=${apiKey}`)
          if(response.ok) {
              const data = await response.json()
              setEightDayData(data)
          } else {
              console.log('no data')
          }
      } catch (error) {
          console.log(error)
      }
  }

  useEffect(() => {
    dispatch(getWeatherAction(weather.search));
    weatherFor8(weather.search)
  }, [weather.search]);
  return (
    <Container>
      <InputGroup className="mb-3">
        <FormControl
          placeholder="City"
          aria-label="Recipient's username"
          aria-describedby="basic-addon2"
          onKeyUp={(e) => (dispatch(setSearchAction(e.target.value)))}
        />
      </InputGroup>

      {/* <DayForecast day={weather.content}/> */}
      <CurrentWeather currentWeather={weather.content} />
    </Container>
  );
};

export default MainPage;
