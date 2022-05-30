interface Icon {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export interface Data {
  main: Main;
  weather: Icon[];
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

export interface lineChartData {
    name : string;
    temp : number;
    icon : string;
}

export interface DailyForecast {
    dt: number;
    weather: Icon[];
    temp: {
      day: number;
      min: number;
      max: number;
    };
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
  }