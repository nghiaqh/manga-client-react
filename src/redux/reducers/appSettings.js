import { SET_CONTENT_FILTER } from 'redux/actions/actionTypes'

const storageKey = '[manga-client-react] content-filter'

const initialState = {
  contentFilter: localStorage.getItem(storageKey) || {
    nsfw: false
  }
}

export default (prevState, action) => {
  const state = Object.assign({}, initialState, prevState)
  switch (action.type) {
    case SET_CONTENT_FILTER:
      return {
        ...state,
        contentFilter: Object.assign({}, state.contentFilter, action.payload.filter)
      }
    default:
      return state
  }
}
