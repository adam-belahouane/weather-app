
import { Col, Container, Row } from "react-bootstrap"

import { useSelector, RootStateOrAny } from "react-redux"
import { ReduxStore } from "../types/ReduxStore"
import { format } from "date-fns"
import "../styles/currentWeather.css"
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Data, lineChartData } from "../types/TodaysData"
import { useEffect, useState } from "react"
import WeeklyForecast from "./WeeklyForecast"
import Humidity from "./Humidity"

interface Props {
    WeatherList: Data[]
}


const CurrentWeather = ({ WeatherList }: Props) => {
    const search = useSelector((state: ReduxStore) => state.weatherApi.search)
    const currentWeather = useSelector((state: RootStateOrAny) => state.weatherApi.content);

    const [lineChartList, setLineChartList] = useState<lineChartData[] | []>([])


    const datauseable = () => {
        let data: lineChartData[] = []
        WeatherList.forEach((time) =>
            data.push({ name: time.dt_txt.slice(10, 16), temp: time.main.temp, icon: time.weather[0].icon })
        )
        setLineChartList(data)
    }

    useEffect(() => {
        datauseable()

    }, [WeatherList])



    if (currentWeather.length === 0) {
        return <></>

    } else {
        return (
            <>
                <Row xs={12} className="my-3">
                    <h1 className="p-2 text-capitalize d-flex align-items-center justify-content-center">
                        {search}
                    </h1>
                </Row >

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

                    <Humidity />

                </Row >
                <Row className="slide-in-left" >
                    <Col className="mb-3" xs={12} lg={6} >
                        <div className="temp-graph-container">
                            <ResponsiveContainer width="95%" height={400}>
                                <AreaChart data={lineChartList} >
                                    <defs>
                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#FA8E74" stopOpacity={0.7} />
                                            <stop offset="80%" stopColor="#FA8E74" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <XAxis dataKey="name" />
                                    <Area type="monotone" dot={true} dataKey="temp" stroke="#FA8E74" fillOpacity={1} strokeWidth={3} fill="url(#colorUv)" />
                                    <Tooltip />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Col>
                    <Col lg={6} className="d-flex align-items-center justify-content-center" >
                        <div className="weekly-weather-container row">
                            <WeeklyForecast />
                        </div>
                    </Col>
                </Row>
            </>
        )

    }
}

export default CurrentWeather



// <LineChart data={lineChartList} >
//                                     <XAxis dataKey="name" />
//                                     <YAxis hide />
//                                     <Tooltip />
//                                     {/* <Legend type="circle"/> */}
//                                     <Line type="monotone" dataKey="temp" stroke="#FA8E74" strokeWidth={1.5} />
//                                 </LineChart>