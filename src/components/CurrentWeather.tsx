import { Col, Row } from "react-bootstrap"
import { useSelector } from "react-redux"
import { ReduxStore } from "../types/ReduxStore"
import  IWeather  from "../types/Weather"


const CurrentWeather = ({currentWeather}: { currentWeather : IWeather}) => {
    const search = useSelector((state : ReduxStore) => state.weatherApi.search)
    return (
        <Col xs={12} className="my-3 slide-in-left">
            <h1 className="p-2 text-capitalize">
                {search}
            </h1>

            <Row className="light-bg mx-0 p-3 ">
                <Col lg={6}>
                    <div >
                        <div className=" text-capitalize d-flex flex-row justify-content-between align-items-center">
                            {/* <strong className="today">Today</strong> <span className="me-5">{format(new Date(), "EEE, d MMM")}</span> */}
                        </div>
                        <div className="d-flex justify-content-center">
                            <div className="d-flex flex-column justify-content-center">
                                <div className="temp-text-big ms-2 ">
                                    <span>{Math.round(currentWeather.main.temp - 273.15)} </span><span className="yellow-text">°C</span>
                                </div>
                                <h6 className="ps-3">
                                    {currentWeather.weather[0].description}
                                </h6>
                            </div>
                            <div >
                                <img className="img-fluid" height="200px" width="200px" src={`http://openweathermap.org/img/wn/${currentWeather.weather[0]?.icon}@2x.png`} />
                            </div >
                        </div >
                    </div >
                </Col >

                <Col className="d-flex flex-column align-items-center" xs={6} lg={3} >


                    <div className="d-flex my-auto flex-column align-items-center ">
                        <img className="img-fluid" height="100px" width="100px" src={`wind.png`} />
                        <span className="wind-text">{currentWeather.wind.speed}</span>
                        <div className="text-muted d-flex flex-row ">
                            <span>Degrees: </span>
                            <span className="ms-1"> {currentWeather.wind.deg}°</span>
                        </div>
                    </div>
                </Col>

                <Col className="d-flex flex-column align-items-center" xs={6} lg={3} >
                    <div className="d-flex my-auto flex-column align-items-center ">
                        <img className="img-fluid" height="100px" width="100px" src="humidity.png" alt="humidity" />
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

export default CurrentWeather