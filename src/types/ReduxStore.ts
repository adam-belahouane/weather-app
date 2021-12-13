import IWeather  from "./Weather";

export interface ReduxStore {
    weatherApi: {
        content: IWeather[],
        isError: boolean,
        isLoading: boolean,
        search: string
    }
}