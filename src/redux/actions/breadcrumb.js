import { SET_BREADCRUMB } from './actionTypes'

export const setBreadcrumb = pathname => ({
  type: SET_BREADCRUMB,
  payload: { pathname }
})
