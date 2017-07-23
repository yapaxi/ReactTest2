import { createTypes, createReducer } from '../../utils/'
import { clone } from 'ramda'

const initialState = {
  posts: null,
  currentPost: null,
}

const types = createTypes([
  'posts',
  'currentPost',
])

export function load() {
  return async (dispatch, getState, api) => {
    const posts = await api.get('https://jsonplaceholder.typicode.com/posts')
    dispatch({
      type: types.posts,
      posts,
    })
  }
}

export function selectPost(id) {
  return ({
    type: types.currentPost,
    currentPost: id,
  })
}

export function addSomething(postId) {
  return (dispatch, getState) => {
    const state = getState()
    const posts = clone(state.postsReducer.posts)

    posts.forEach((e) => {
      if (!postId || e.id === postId) {
        e.title = `aa${e.title}`
      }
    })

    dispatch({
      type: types.posts,
      posts: posts,
    })
  }
}

export const postsReducer = createReducer(initialState, {
  [types.posts]: (state, { posts }) => ({ ...state, posts }),
  [types.currentPost]: (state, { currentPost }) => ({ ...state, currentPost }),
})
