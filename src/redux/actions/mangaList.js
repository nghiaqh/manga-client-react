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
  order = 'modifiedAt DESC') =>
  dispatch => {
    dispatch(requestMangas(id, pageSize, pageNumber, filter, order))
    const { artistId, title } = filter

    const where = artistId ? { artistId: artistId } : {}
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
      .then(json => dispatch(receiveMangas(id, json)))
  }

/**
 * Request total number of mangas
 * @param {String} id
 * @param {Object} filter { title: x, artist: y }
 */
export const countMangas = (id, filter = {}) => dispatch => {
  dispatch(requestNumberOfMangas(id, filter))

  const { artistId, title } = filter
  const where = artistId ? { artistId: artistId } : {}
  if (typeof title !== 'undefined' && title !== '') {
    where.title = {
      regexp: '.*' + title + '.*',
      options: 'i'
    }
  }

  return fetch(`${getApiPath('countMangas')}?where=${JSON.stringify(where)}`)
    .then(res => res.json())
    .then(json => dispatch(receiveNumberOfMangas(id, json)))
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
      data.filter.title === filter.title &&
      data.filter.artistId === filter.artistId &&
      data.pageNumber >= pageNumber
    ) {
      return
    }

    dispatch(countMangas(id, filter))
    dispatch(fetchMangas(id, pageSize, pageNumber, filter, order))
  }
