import React from 'react'
import ReactDOM from 'react-dom/client'
import { combineReducers, createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from 'reducers/filterReducer'

const reducerCombined = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})
const store = createStore(reducerCombined)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)