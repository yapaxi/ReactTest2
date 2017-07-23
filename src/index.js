import React from 'react'
import ReactDOM from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, match, browserHistory } from 'react-router'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { trigger } from 'redial'
import '../css/index.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { routes, reducers } from './routes/App'
import { api } from './utils/api'

const { pathname, search, hash } = window.location

const store = createStore(
  combineReducers({
    ...reducers,
  }),
  applyMiddleware(
    thunk.withExtraArgument(api),
  )
)

const { dispatch } = store

const render = () => {
  match({ routes, location: `${pathname}${search}${hash}` }, (error, redirectLocation, renderProps) => {
    const { components } = renderProps

    const getLocals = {
      path: renderProps.location.pathname,
      query: renderProps.location.query,
      params: renderProps.params,

      dispatch,
    }

    trigger('fetch', components, getLocals)

    ReactDOM.render(
      <Provider store={store}>
        <Router routes={routes} history={browserHistory} />
      </Provider>,
      document.getElementById('root')
    )
  })

  browserHistory.listen((location) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      const { components } = renderProps

      const getLocals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,

        dispatch,
      }

      trigger('fetch', components, getLocals)
    })
  })
}

render()
