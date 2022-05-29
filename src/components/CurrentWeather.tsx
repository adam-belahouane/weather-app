import { Col, Row } from "react-bootstrap"
import { useSelector, RootStateOrAny } from "react-redux"
import { ReduxStore } from "../types/ReduxStore"
import  IWeather  from "../types/Weather"
import { format } from "date-fns"
import "../styles/currentWeather.css"


const CurrentWeather = () => {
    const search = useSelector((state : ReduxStore) => state.weatherApi.search)
    const currentWeather = useSelector((state: RootStateOrAny) => state.weatherApi.content);
if(currentWeather.length === 0){
    return <></>
    
   }else{
    return (
        <Col xs={12} className="my-3 slide-in-left">
            <h1 className="p-2 text-capitalize white-text">
                {search}
            </h1>

            <Row className="light-bg mx-0 p-3 current-weather-container ">
                <Col lg={6}>
                    <div >
                        <div className=" text-capitalize d-flex flex-row justify-content-between align-items-center">
                            <strong className="today-text">Today</strong> <span className="me-5">{format(new Date(), "EEE, d MMM")}</span>
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex flex-column justify-content-center">
                                <div className="temp-text-big ms-2 ">
                                    <span>{Math.round(currentWeather.main.temp - 273.15)} </span><span className="yellow-text">°C</span>
                                </div>
                                <h6 className="ps-3">
                                {currentWeather.weather[0].description[0].toUpperCase() + currentWeather.weather[0].description.substring(1)}
                                </h6>
                            </div>
                            <div >
                                <img className="img-fluid" height="200px" width="200px" alt="weather-img" src={`http://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@2x.png`} />
                            </div >
                        </div >
                    </div >
                </Col >

                <Col className="d-flex flex-column align-items-center" xs={6} lg={3} >


                    <div className="d-flex my-auto flex-column align-items-center ">
                        <img className="img-fluid" height="150px" width="150px" alt="wind speed" src={`wind.png`} />
                        <span className="wind-text">{currentWeather.wind.speed}</span>
                        <div className="text-muted d-flex flex-row ">
                            <span>Degrees: </span>
                            <span className="ms-1"> {currentWeather.wind.deg}°</span>
                        </div>
                    </div>
                </Col>

                <Col className="d-flex flex-column align-items-center" xs={6} lg={3} >
                    <div className="d-flex my-auto flex-column align-items-center ">
                        <img className="img-fluid" height="150px" width="150px" src="humidity.png" alt="humidity" />
                        <span className="wind-text">{currentWeather.main.humidity}%</span>
                        <div className="text-muted d-flex flex-row ">
                                <span>Pressure: </span>
                                <span className="ms-1"> {currentWeather.main.pressure}</span>
                            </div>
                    </div>
                </Col >

            </Row >
        </Col >
    )
    }
}

export default CurrentWeather