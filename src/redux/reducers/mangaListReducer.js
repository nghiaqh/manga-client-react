import {
  REQUEST_MANGAS,
  RECEIVE_MANGAS,
  REQUEST_NUMBER_OF_MANGAS,
  RECEIVE_NUMBER_OF_MANGAS
} from 'redux/actions/actionTypes'

import {
  initialState,
  onDataRequested,
  onDataReceived,
  onTotalRequested,
  onTotalReceived
} from './withLoadMoreReducers'

const mangaListReducer = (prevState, action) => {
  const state = Object.assign({}, initialState, prevState)
  switch (action.type) {
    case REQUEST_MANGAS:
      return onDataRequested(state, action)
    case RECEIVE_MANGAS:
      return onDataReceived(state, action)
    case REQUEST_NUMBER_OF_MANGAS:
      return onTotalRequested(state, action)
    case RECEIVE_NUMBER_OF_MANGAS:
      return onTotalReceived(state, action)
    default:
      return state
  }
}

export default mangaListReducer
