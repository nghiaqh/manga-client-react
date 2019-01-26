import { normalize, schema } from 'normalizr'
import {
  REQUEST_ARTISTS,
  RECEIVE_ARTISTS,
  REQUEST_NUMBER_OF_ARTISTS,
  RECEIVE_NUMBER_OF_ARTISTS
} from './actionTypes'
import {
  createRequestItemsAction,
  createReceiveItemsAction,
  createRequestItemCountAction,
  createReceiveItemCountAction
} from './actionCreators'
import getApiPath from 'libs/apiRoutes'

const requestArtists = createRequestItemsAction(REQUEST_ARTISTS)
const receiveArtists = createReceiveItemsAction(RECEIVE_ARTISTS, normalizeData)
const requestNumberOfArtists = createRequestItemCountAction(REQUEST_NUMBER_OF_ARTISTS)
const receiveNumberOfArtists = createReceiveItemCountAction(RECEIVE_NUMBER_OF_ARTISTS)

function normalizeData (json) {
  const artist = new schema.Entity('artists')
  return normalize(json, [artist])
}

/**
 * Request a list of artists
 * @param {String} id
 * @param {Integer} pageSize number of items per page
 * @param {Integer} pageNumber
 * @param {Object} filter { name: x }
 * @param {String} order mysql order input
 */
function fetchArtists (
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'name'
) {
  return (dispatch) => {
    const hash = Date.now()
    dispatch(requestArtists(id, pageSize, pageNumber, filter, order, hash))

    const { name } = filter
    const where = Object.assign({}, filter)
    if (typeof name !== 'undefined' && name !== '') {
      where.name = {
        regexp: `/.*${name}.*/i`
      }
    }

    const filterObj = {
      where: where,
      limit: pageSize,
      skip: pageSize * (pageNumber - 1),
      order: order
    }

    return fetch(`${getApiPath('artists')}?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveArtists(id, json, hash)))
  }
}

/**
 * Request total number of artists
 * @param {String} id
 * @param {filter} { name: x }
 */
function countArtists (id, filter = {}) {
  return (dispatch) => {
    const hash = Date.now()
    dispatch(requestNumberOfArtists(id, filter, hash))

    const { name } = filter
    const where = Object.assign({}, filter)
    if (typeof name !== 'undefined' && name !== '') {
      where.name = {
        regexp: `/.*${name}.*/i`
      }
    }

    return fetch(`${getApiPath('countArtists')}?where=${JSON.stringify(where)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveNumberOfArtists(id, json, hash)))
  }
}

/**
 *
 * @param {String} id
 * @param {Integer} pageSize
 * @param {Integer} pageNumber
 * @param {Object} filter
 */
export function loadMoreArtists (
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'name'
) {
  return (dispatch, getState) => {
    const { withLoadMore } = getState()
    const data = withLoadMore[id]
    if (
      typeof data !== 'undefined' &&
      data.filter.name === filter.name &&
      data.pageNumber >= pageNumber
    ) {
      return
    }

    dispatch(countArtists(id, filter))
    dispatch(fetchArtists(id, pageSize, pageNumber, filter, order))
  }
}
