export interface Data {
  main: Main;
  weather: Weather[];
  name: string;
  dt_txt: string;
  wind: { deg: number; gust: number; speed: number };
}

interface Main {
  temp: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
  pressure: number;
}

interface Weather {
  description: string;
  icon: string;
}

export interface lineChartData {
    name : string;
    temp : number;
}
