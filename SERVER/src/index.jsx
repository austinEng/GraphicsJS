import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import App from './components/app.jsx'
import configureStore from './configureStore'
const store = configureStore(window.__PRELOADED_STATE__)

console.log('INITIAL STATE:', store.getState())

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')  
)