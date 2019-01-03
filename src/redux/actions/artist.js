import {
  REQUEST_ARTIST,
  RECEIVE_ARTIST
} from './actionTypes'
import {
  requestItemById,
  receiveItemById
} from './actionCreators'
import getApiPath from './getApiPath'

const requestArtist = requestItemById(REQUEST_ARTIST)
const receiveArtist = receiveItemById(RECEIVE_ARTIST)

/**
 * Request a artist by ID
 * @param {String} id
 */
export const fetchArtistById = id => dispatch => {
  dispatch(requestArtist(id))

  return fetch(getApiPath('artistById', { id }))
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
