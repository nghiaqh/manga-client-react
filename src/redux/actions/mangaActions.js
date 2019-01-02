import {
  REQUEST_MANGA,
  RECEIVE_MANGA
} from './actionTypes'
import { apiRoutes } from './apiRoutes'
import get from 'lodash/get'

export const requestManga = id => ({
  type: REQUEST_MANGA,
  payload: { id }
})

export const receiveManga = manga => ({
  type: RECEIVE_MANGA,
  payload: {
    manga,
    receivedAt: Date.now()
  }
})

export const fetchMangaById = id => dispatch => {
  dispatch(requestManga(id))
  return fetch(`${apiRoutes.mangas}/${id}`)
    .then(response => response.json())
    .then(json => dispatch(receiveManga(json)))
}

export const fetchMangaByIdIfNeeded = id => (dispatch, getState) => {
  const { mangas } = getState().entities

  if (get(mangas, id) === undefined) {
    dispatch(fetchMangaById(id))
  }
}
