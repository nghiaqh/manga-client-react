import { SET_THEME, SET_STYLE } from './actionTypes'

export const setTheme = theme => ({
  type: SET_THEME,
  payload: { theme }
})

export const setStyle = style => ({
  type: SET_STYLE,
  payload: { style }
})
