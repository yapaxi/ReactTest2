export function createReducer(initialState, reducers) {
  return (state = initialState, { type, ...payload }) => {
    const handler = reducers[type]

    if (type === 'reset') {
      return initialState
    }

    if (handler) {
      return handler(state, payload)
    }

    return state
  }
}
