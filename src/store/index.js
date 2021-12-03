import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'
import weatherApiReducer from '../reducers/weatherApi'

const aComposeThatAlwaysWorks = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
 
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
      secretKey: process.env.REACT_APP_ENCRYPT_KEY,
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