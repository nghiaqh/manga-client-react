import mangaReducer from './mangaReducer'
import mangaListReducer from './mangaListReducer'

/**
 * Combine reducers to make a flat state
 * @param {Array} reducers a list of reducers
 */
const reduceReducers = (...reducers) => (prevState, value, ...args) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, value, ...args),
    prevState
  )

export default reduceReducers(
  mangaReducer,
  mangaListReducer
)
