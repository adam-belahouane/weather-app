import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import weatherApiReducer from '../reducers/weatherApi'
import { ReduxStore } from '../types/ReduxStore'
import IWeather from '../types/Weather'

const aComposeThatAlwaysWorks = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState: ReduxStore = {
 
  weatherApi: {
      content: [],
      isError: false,
      isLoading: true,
      search: 'London'
  }
  
}

const persistConfig = {
  key: 'root',
  storage,
  transforms: [
    encryptTransform({
      secretKey: (process.env.REACT_APP_ENCRYPT_KEY as string),
    }),
  ],
}

const bigReducer = combineReducers({
  weatherApi: weatherApiReducer
})

const persistedBigReducer = persistReducer(persistConfig, bigReducer)

const configureStore = createStore(
  persistedBigReducer,
  initialState,
  aComposeThatAlwaysWorks(applyMiddleware(thunk))
)

export const persistor = persistStore(configureStore)

export default configureStore