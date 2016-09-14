
// const {createStore, applyMiddleware} = require('redux')
// const thunkMiddleware = require('redux-thunk').default
// const createLogger = require('redux-logger')
// const {graphicsApp} = require('./reducers')

import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from './reducers'

const loggerMiddleware = createLogger()

export default function configureStore(preloadedState) {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}

// import createStore from 'redux'
// import graphicsApp from './reducers'

// export default function configureStore(preloadedState) {
//   return createStore(
//     graphicsApp,
//     preloadedState
//   )
// }