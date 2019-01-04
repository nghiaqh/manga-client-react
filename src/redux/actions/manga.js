import {
  REQUEST_MANGA,
  RECEIVE_MANGA
} from './actionTypes'
import {
  createRequestItemByIdAction,
  createReceiveItemByIdAction
} from './actionCreators'
import getApiPath from 'libs/apiRoutes'
import get from 'lodash/get'

const requestManga = createRequestItemByIdAction(REQUEST_MANGA)
const receiveManga = createReceiveItemByIdAction(RECEIVE_MANGA)

export const fetchMangaById = id => dispatch => {
  dispatch(requestManga(id))
  return fetch(getApiPath('mangaById', { id }))
    .then(response => response.json())
    .then(json => dispatch(receiveManga(json)))
}

export const fetchMangaByIdIfNeeded = id => (dispatch, getState) => {
  const { mangas } = getState().entities

  if (get(mangas, id) === undefined) {
    dispatch(fetchMangaById(id))
  }
}
