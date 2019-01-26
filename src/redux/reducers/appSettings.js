import { SET_CONTENT_FILTER } from 'redux/actions/actionTypes'

const storageKey = '[manga-client-react] content-filter'
const keyValue = JSON.parse(localStorage.getItem(storageKey) || '{}')
const initialState = {
  contentFilter: keyValue || {
    includeNSFW: false
  }
}

export default (prevState, action) => {
  const state = Object.assign({}, initialState, prevState)
  switch (action.type) {
    case SET_CONTENT_FILTER:
      localStorage.setItem(storageKey, JSON.stringify(action.payload.filter))
      return {
        ...state,
        contentFilter: Object.assign({}, state.contentFilter, action.payload.filter)
      }
    default:
      return state
  }
}
