import { SET_THEME, SET_STYLE } from 'redux/actions/actionTypes'

const storageKey = '[manga-client-react] theme'

const initialState = {
  style: 'basic',
  theme: localStorage.getItem(storageKey) || 'light'
}

export default (prevState, action) => {
  const state = Object.assign({}, initialState, prevState)
  switch (action.type) {
    case SET_STYLE:
      return {
        ...state,
        style: action.payload.style
      }
    case SET_THEME:
      localStorage.setItem(storageKey, action.payload.theme)
      return {
        ...state,
        theme: action.payload.theme
      }
    default:
      return state
  }
}
