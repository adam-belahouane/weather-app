import { RootStateOrAny, useSelector } from "react-redux"
import { Col } from "react-bootstrap"
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useEffect, useState } from "react"

interface chartData {
    name: string;
    value: number;
}

const Humidity = () => {
    const weather = useSelector((state: RootStateOrAny) => state.weatherApi.content)
    const [pieChartData, setPieChartData] = useState<chartData[] | []>([])

    useEffect(() => {
        setPieChartData(
           [{ name: "rain", value: weather.main.humidity }, { name: "norain", value: 100 - weather.main.humidity }]
        )
    }, [weather])
    return(
        <Col className="d-flex flex-column align-items-center high-to-low-container" xs={6} lg={3} >
                        <span className="wind-text">Humidity</span>
                        <ResponsiveContainer height="70%" width="100%">
                            <PieChart>
                                <Pie data={pieChartData} dataKey="value" fill="#000000" stroke="none" innerRadius={50} outerRadius={60} startAngle={450} endAngle={90} >
                                    <Cell key={`cell-0`} fill="#000000" />
                                    <Cell key={`cell-1`} fill="#66deffb3" />
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                       {weather.main.humidity < 33?<div className="high-to-low">
                            low
                        </div>:weather.main.humidity < 66?<div className="high-to-low">medium</div>:<div className="high-to-low">High</div>}



                        <div className="d-flex flex-row ">
                            <span className="text-muted">Pressure: </span>
                            <span className="ms-1 text-muted"> {weather.main.pressure}</span>
                        </div>

                    </Col >
    )
}

export default Humidity