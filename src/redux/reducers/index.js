import mangaReducer from './manga'
import artistReducer from './artist'
import withLoadMoreReducer from './withLoadMore'
import withPaginationReducer from './withPagination'
import breadcrumbReducer from './breadcrumb'

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
  artistReducer,
  withLoadMoreReducer,
  withPaginationReducer,
  breadcrumbReducer
)
