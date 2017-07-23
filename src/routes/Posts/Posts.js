import React from 'react'
import { pick } from 'ramda'
import { compose, withHandlers, withPropsOnChange, mapProps } from 'recompose'
import { connect } from 'react-redux'
import { provideHooks } from 'redial'
import * as actions from './module'

const hooks = {
  fetch: ({ dispatch }) => Promise.all([
    dispatch(actions.load()),
  ]),
}

const mapStateToProps = ({ postsReducer }) => ({ ...postsReducer })

const eventHandlers = {
  onTitleClick: ({ selectPost }) => ({ id }) => selectPost(id),
  onClearSelection: ({ selectPost }) => () => selectPost(null),
  onAddSomething: ({ currentPost, addSomething }) => () => addSomething(currentPost),
}

const enhance = compose(
    provideHooks(hooks),
    connect(mapStateToProps, actions),
    withHandlers(eventHandlers),
    withPropsOnChange(
      ['posts', 'currentPost'],
      ({ posts, currentPost }) => ({
        posts: currentPost ? posts.filter(e => e.id === currentPost) : posts,
      })
    ),
    mapProps(props => ({
      handlers: pick(Object.keys(eventHandlers), props),
      ...props,
    }))
)

const Posts = ({ posts, handlers }) =>
(
  <div>
    { posts &&
      <div>
        <button onClick={handlers.onClearSelection}>Clear selection</button>
        <button onClick={handlers.onAddSomething}>Add</button>
      </div>
    }
    { posts &&
      <div className='pseudo-table'> {
          posts.map(e => (
            <div key={e.id} className='pseudo-row'>
              <div>{e.id}</div>
              <div onClick={() => handlers.onTitleClick({ id: e.id })}>{e.title}</div>
            </div>
          ))
      }</div>
    }
  </div>
)

export default enhance(Posts)
