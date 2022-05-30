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
        
        <Col xs={6}>
            {date && <h3 className="px-2 py-2 m-0">{format(date, "EEEE")}</h3>}
            <div className="d-flex flex-column light-bg p-3 p-md-2 ">
                <div className="d-flex align-items-center justify-content-around" >
                    <div className="d-flex flex-column">
                        <div className="d-flex temp-text ">
                            <span >{Math.round(day.temp.day)}</span> <span className="ps-1 yellow-text">°C</span>
                        </div>
                        <span className="time-text" >{day.weather[0]?.description}</span>
                    </div>

                    <img height="100px" width="100px" src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} />

                </div>

            </div>
        </Col>
    
    )
}

export default DayForecast