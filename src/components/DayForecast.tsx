import { useEffect, useState } from "react"
import { Col } from "react-bootstrap"
import IWeather from "../types/Weather"

const DayForecast = ({day} : {day : IWeather}) => {
    const [date, setDate] = useState(null)

    useEffect(() => {
        const daysDate = new Date(1000 * day.dt)
        // setDate(daysDate)
    }, [])

    return (
        <Col className="my-1 my-md-4 slide-in-left" xs={12} md={6} lg={3}>
            {/* {date && <h3 className="px-2 py-2">{format(date, "EEEE")}</h3>} */}
            <div className="d-flex flex-column light-bg p-3 p-md-2 ">
                <div className="d-flex align-items-center justify-content-around" >
                    <div className="d-flex flex-column">
                        <div className="d-flex temp-text ">
                            <span >{Math.round(day.main.temp - 273.15)}</span> <span className="ps-1 yellow-text">°C</span>
                        </div>
                        <span className="time-text" >{day.weather[0]?.description}</span>
                    </div>

                    <img height="100px" width="100px" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />

                </div>
              

                    <div className="d-flex my-auto flex-row align-items-center justify-content-around ">
                        <img className="img-fluid" height="25px" width="25px" src={`wind.png`} />
                        <span className="wind-text">{day.wind.speed}</span>
                        <div className="text-muted d-flex flex-row ">
                            <span>Degrees: </span>
                            <span> {day.wind.deg}°</span>
                        </div>
                    </div>


            </div>
        </Col>
    )
}

export default DayForecast