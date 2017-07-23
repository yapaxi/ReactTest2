import * as posts from '../Posts'
import App from './App'

export const routes = {
  path: '/',
  component: App,
  childRoutes: [
    posts.routes,
  ],
}

export const reducers = {
  ...posts.reducers,
}
