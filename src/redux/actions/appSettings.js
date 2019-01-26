import { SET_CONTENT_FILTER } from './actionTypes'

export const setContentFilter = filter => ({
  type: SET_CONTENT_FILTER,
  payload: { filter }
})
