import { SET_THEME, SET_STYLE } from './actions'

const initialState = {
  style: 'basic',
  theme: 'light'
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
      return {
        ...state,
        theme: action.payload.theme
      }
    default:
      return state
  }
}
