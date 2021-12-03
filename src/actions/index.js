export const GET_WEATHER = "GET_WEATHER";
export const GET_WEATHER_ERROR = "GET_WEATHER_ERROR";
export const TOGGLE_LOADER = "TOGGLE_LOADER";
export const SET_SEARCH = "SET_SEARCH";

export const setSearchAction = (query) => ({
    type: SET_SEARCH,
    payload: query
})

const apiKey = process.env.REACT_APP_API_KEY;
export const getWeatherAction = (search) => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${apiKey}`
      );
      if (response.ok) {
        const data = await response.json();
        dispatch({
          type: GET_WEATHER,
          payload: data,
        });
        setTimeout(() => {
          dispatch({
            type: TOGGLE_LOADER,
            payload: false,
          });
        }, 500);
      } else {
        dispatch({
          type: GET_WEATHER_ERROR,
        });
        dispatch({
          type: TOGGLE_LOADER,
          payload: false,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: GET_WEATHER_ERROR,
      });
      dispatch({
        type: TOGGLE_LOADER,
        payload: false,
      });
    }
  };
};
