import { postsReducer } from './module'
import Posts from './Posts'

export const routes = {
  path: 'posts',
  component: Posts,
  childRoutes: [],
}

export const reducers = {
  postsReducer,
}
