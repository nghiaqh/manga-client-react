import isEqual from 'lodash/isEqual'
import { normalize, schema } from 'normalizr'
import {
  REQUEST_MANGAS,
  RECEIVE_MANGAS,
  REQUEST_NUMBER_OF_MANGAS,
  RECEIVE_NUMBER_OF_MANGAS
} from './actionTypes'
import {
  createRequestItemsAction,
  createReceiveItemsAction,
  createRequestItemCountAction,
  createReceiveItemCountAction
} from './actionCreators'
import getApiPath from 'libs/apiRoutes'

export const setIsNew = json => json.map(item => {
  const now = new Date()
  const then = new Date(item.updated)
  item.isNew = (now - then) / (1000 * 3600 * 24) <= 14
  return item
})

export const normalizeData = json => {
  const data = setIsNew(json)

  const artist = new schema.Entity('artists')
  const manga = new schema.Entity('mangas', {
    artist: artist
  })

  return normalize(data, [manga])
}

const requestMangas = createRequestItemsAction(REQUEST_MANGAS)
const receiveMangas = createReceiveItemsAction(RECEIVE_MANGAS, normalizeData)
const requestNumberOfMangas = createRequestItemCountAction(REQUEST_NUMBER_OF_MANGAS)
const receiveNumberOfMangas = createReceiveItemCountAction(RECEIVE_NUMBER_OF_MANGAS)

/**
 * Call mangas api
 * @param {String} id
 * @param {Integer} pageSize number of items per page
 * @param {Integer} pageNumber
 * @param {Object} filter { title: x, artist: y }
 * @param {String} order mysql order input
 */
export const fetchMangas = (
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'latestPublishedDate DESC') =>
  dispatch => {
    const hash = Date.now()
    dispatch(requestMangas(id, pageSize, pageNumber, filter, order, hash))

    const { title } = filter
    const where = Object.assign({}, filter)
    if (typeof title !== 'undefined' && title !== '') {
      where.title = {
        regexp: `/.*${title}.*/i`
      }
    }

    const filterObj = {
      where: where,
      limit: pageSize,
      skip: pageSize * (pageNumber - 1),
      order: order
    }

    return fetch(`${getApiPath('mangas')}?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveMangas(id, json, hash)))
  }

/**
 * Request total number of mangas
 * @param {String} id
 * @param {Object} filter { title: x, artist: y }
 */
export const countMangas = (id, filter = {}) => dispatch => {
  const hash = Date.now()
  dispatch(requestNumberOfMangas(id, filter, hash))

  const { title } = filter
  const where = Object.assign({}, filter)
  if (typeof title !== 'undefined' && title !== '') {
    where.title = {
      regexp: `/.*${title}.*/i`
    }
  }

  return fetch(`${getApiPath('countMangas')}?where=${JSON.stringify(where)}`)
    .then(res => res.json())
    .then(json => dispatch(receiveNumberOfMangas(id, json, hash)))
}

/**
 *
 * @param {String} id
 * @param {Integer} pageSize
 * @param {Integer} pageNumber
 * @param {Object} filter
 */
export const loadMoreMangas = (
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'publishedAt DESC'
) =>
  (dispatch, getState) => {
    const { withLoadMore } = getState()
    const data = withLoadMore[id]

    if (
      typeof data !== 'undefined' &&
      isEqual(data.filter, filter) &&
      data.pageNumber >= pageNumber &&
      data.order === order
    ) {
      return
    }

    dispatch(countMangas(id, filter))
    dispatch(fetchMangas(id, pageSize, pageNumber, filter, order))
  }
