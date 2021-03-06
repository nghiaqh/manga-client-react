import isEqual from 'lodash/isEqual'
import { normalize, schema } from 'normalizr'
import {
  REQUEST_IMAGES,
  RECEIVE_IMAGES,
  REQUEST_NUMBER_OF_IMAGES,
  RECEIVE_NUMBER_OF_IMAGES
} from './actionTypes'
import {
  createRequestItemsAction,
  createReceiveItemsAction,
  createRequestItemCountAction,
  createReceiveItemCountAction
} from './actionCreators'
import getApiPath from 'libs/apiRoutes'

export const normalizeData = json => {
  const image = new schema.Entity('images')

  return normalize(json, [image])
}

const requestImages = createRequestItemsAction(REQUEST_IMAGES)
const receiveImages = createReceiveItemsAction(RECEIVE_IMAGES, normalizeData)
const requestNumberOfImages = createRequestItemCountAction(REQUEST_NUMBER_OF_IMAGES)
const receiveNumberOfImages = createReceiveItemCountAction(RECEIVE_NUMBER_OF_IMAGES)

/**
 * Call images api
 * @param {String} id
 * @param {Integer} pageSize number of items per page
 * @param {Integer} pageNumber
 * @param {Object} filter { title: x, artist: y }
 * @param {String} order mysql order input
 */
export const fetchImages = (
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'number') =>
  dispatch => {
    const hash = Date.now()
    dispatch(requestImages(id, pageSize, pageNumber, filter, order, hash))
    const { chapterId, title } = filter

    const where = chapterId ? { chapterId: chapterId } : {}
    if (typeof title !== 'undefined' && title !== '') {
      where.title = {
        regexp: '.*' + title + '.*',
        options: 'i'
      }
    }

    const filterObj = {
      where: where,
      limit: pageSize,
      skip: pageSize * (pageNumber - 1),
      order: order
    }

    return fetch(`${getApiPath('images')}?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveImages(id, json, hash)))
  }

/**
 * Request total number of images
 * @param {String} id
 * @param {Object} filter { title: x, artist: y }
 */
export const countImages = (id, filter = {}) => dispatch => {
  const hash = Date.now()
  dispatch(requestNumberOfImages(id, filter, hash))

  const { title } = filter
  const where = Object.assign({}, filter)
  if (typeof title !== 'undefined' && title !== '') {
    where.title = {
      regexp: '.*' + title + '.*',
      options: 'i'
    }
  }

  return fetch(`${getApiPath('countImages')}?where=${JSON.stringify(where)}`)
    .then(res => res.json())
    .then(json => dispatch(receiveNumberOfImages(id, json, hash)))
}

/**
 *
 * @param {String} id
 * @param {Integer} pageSize
 * @param {Integer} pageNumber
 * @param {Object} filter
 */
export const loadMoreImages = (
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
      isEqual(data.filter, filter) &&
      data.pageNumber >= pageNumber
    ) {
      return
    }

    dispatch(countImages(id, filter))
    dispatch(fetchImages(id, pageSize, pageNumber, filter, order))
  }

export const paginatePages = (
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'number'
) =>
  (dispatch, getState) => {
    const { withPagination } = getState()
    const data = withPagination[id]

    if (
      typeof data !== 'undefined' &&
      isEqual(data.filter, filter) &&
      data.pageNumber === pageNumber
    ) {
      return
    }

    const reducer = 'WITH_PAGINATION'
    dispatch(countImages(id, filter, reducer))
    dispatch(fetchImages(id, pageSize, pageNumber, filter, order, reducer))
  }
