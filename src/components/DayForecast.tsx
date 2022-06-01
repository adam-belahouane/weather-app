import { useEffect, useState } from "react"
import { Col, Container } from "react-bootstrap"
import { DailyForecast } from "../types/TodaysData"
import format from "date-fns/format"

const DayForecast = ({day} : {day : DailyForecast}) => {
    const [date, setDate] = useState<Date | null>(null)

    useEffect(() => {
        const daysDate: Date = new Date(1000 * day.dt)
        setDate(daysDate)
    }, [])

    return (
        
        <Col xs={12} md={6}>
            {/* <div className="d-flex flex-column light-bg p-3 p-md-2 "> */}
                <div className="d-flex align-items-center justify-content-between px-2 slide-in-left" >
                    <div className="d-flex flex-column">
                            {date && <p className="m-0 day-of-week">{format(date, "EEEE")}</p>}
                        <div className="d-flex temp-text ">
                            <span className="small-temp-color">{Math.round(day.temp.day)}</span> <span className="ps-1 small-temp-color">°C</span>
                        </div>
                        <span className="time-text" >{day.weather[0]?.description[0].toUpperCase() + day.weather[0]?.description.substring(1)}</span>
                    </div> 

                    <img height="100px" width="100px" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />

                </div>

            {/* </div> */}
        </Col>
    
    )
}

export default DayForecast