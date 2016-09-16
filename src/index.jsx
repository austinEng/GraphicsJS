import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app.jsx'
import configureStore from './configureStore'
import layout from './layouts/default'
require('./scene')

const store = configureStore(layout)
console.log('INITIAL STATE:', store.getState())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
