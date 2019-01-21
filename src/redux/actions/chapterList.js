import { normalize, schema } from 'normalizr'
import {
  REQUEST_CHAPTERS,
  RECEIVE_CHAPTERS,
  REQUEST_NUMBER_OF_CHAPTERS,
  RECEIVE_NUMBER_OF_CHAPTERS
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
  const chapter = new schema.Entity('chapters')

  return normalize(data, [chapter])
}

const requestChapters = createRequestItemsAction(REQUEST_CHAPTERS)
const receiveChapters = createReceiveItemsAction(RECEIVE_CHAPTERS, normalizeData)
const requestNumberOfChapters = createRequestItemCountAction(REQUEST_NUMBER_OF_CHAPTERS)
const receiveNumberOfChapters = createReceiveItemCountAction(RECEIVE_NUMBER_OF_CHAPTERS)

/**
 * Call chapters api
 * @param {String} id
 * @param {Integer} pageSize number of items per page
 * @param {Integer} pageNumber
 * @param {Object} filter { title: x, artist: y }
 * @param {String} order mysql order input
 */
export const fetchChapters = (
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'number') =>
  dispatch => {
    dispatch(requestChapters(id, pageSize, pageNumber, filter, order))
    const { title } = filter
    const where = filter || {}

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

    return fetch(`${getApiPath('chapters')}?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveChapters(id, json)))
  }

/**
 * Request total number of chapters
 * @param {String} id
 * @param {Object} filter { title: x, artist: y }
 */
export const countChapters = (id, filter = {}) => dispatch => {
  dispatch(requestNumberOfChapters(id, filter))

  const { mangaId, title } = filter
  const where = mangaId ? { mangaId: mangaId } : {}
  if (typeof title !== 'undefined' && title !== '') {
    where.title = {
      regexp: `/.*${title}.*/i`
    }
  }

  return fetch(`${getApiPath('countChapters')}?where=${JSON.stringify(where)}`)
    .then(res => res.json())
    .then(json => dispatch(receiveNumberOfChapters(id, json)))
}

/**
 *
 * @param {String} id
 * @param {Integer} pageSize
 * @param {Integer} pageNumber
 * @param {Object} filter
 */
export const loadMoreChapters = (
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'number'
) =>
  (dispatch, getState) => {
    const { withLoadMore } = getState()
    const data = withLoadMore[id]
    if (
      typeof data !== 'undefined' &&
      data.filter.title === filter.title &&
      data.filter.mangaId === filter.mangaId &&
      data.pageNumber >= pageNumber
    ) {
      return
    }

    dispatch(countChapters(id, filter))
    dispatch(fetchChapters(id, pageSize, pageNumber, filter, order))
  }
