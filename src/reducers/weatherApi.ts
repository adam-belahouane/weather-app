import { AnyAction } from "redux";
import { GET_WEATHER, GET_WEATHER_ERROR, TOGGLE_LOADER, SET_SEARCH } from "../actions";
import { initialState } from "../store";

const weatherApiReducer = (state = initialState.weatherApi, action: AnyAction) => {
    switch (action.type) {
        case GET_WEATHER:
          return {
            ...state,
            content: action.payload,
          }
        case GET_WEATHER_ERROR:
          return {
            ...state,
            isError: true,
          }
        case TOGGLE_LOADER:
          return {
            ...state,
            isLoading: action.payload,
          }
         case SET_SEARCH:
              return {
                  ...state,
                  search: action.payload
          }
        default:
          return state
      }
}

export default weatherApiReducer