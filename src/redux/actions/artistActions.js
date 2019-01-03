import {
  REQUEST_ARTIST,
  RECEIVE_ARTIST
} from './actionTypes'
import getApiPath from './apiRoutes'

/*
 * Sync action creators
 */
export const requestArtist = (id) => ({
  type: REQUEST_ARTIST,
  payload: { id }
})

export const receiveArtist = (json) => ({
  type: RECEIVE_ARTIST,
  payload: {
    artist: json[0],
    receivedAt: Date.now()
  }
})

/**
 * Request a artist by ID
 * @param {String} id
 */
export const fetchArtistById = id => dispatch => {
  dispatch(requestArtist(id))

  return fetch(getApiPath('artistById', id))
    .then(res => res.json())
    .then(json => dispatch(receiveArtist(json)))
}

/**
 * Use to determine if we need to call artists api again, using stored state
 */
export const fetchArtistByIdIfNeeded = id => (dispatch, getState) => {
  const { artists } = getState().entities
  if (typeof artists === 'undefined' || typeof artists[id] === 'undefined') {
    dispatch(fetchArtistById(id))
  }
}
