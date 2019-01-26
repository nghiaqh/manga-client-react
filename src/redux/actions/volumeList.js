import isEqual from 'lodash/isEqual'
import { normalize, schema } from 'normalizr'
import {
  REQUEST_VOLUMES,
  RECEIVE_VOLUMES,
  REQUEST_NUMBER_OF_VOLUMES,
  RECEIVE_NUMBER_OF_VOLUMES
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
  const volume = new schema.Entity('volumes')

  return normalize(data, [volume])
}

const requestVolumes = createRequestItemsAction(REQUEST_VOLUMES)
const receiveVolumes = createReceiveItemsAction(RECEIVE_VOLUMES, normalizeData)
const requestNumberOfVolumes = createRequestItemCountAction(REQUEST_NUMBER_OF_VOLUMES)
const receiveNumberOfVolumes = createReceiveItemCountAction(RECEIVE_NUMBER_OF_VOLUMES)

/**
 * Call volumes api
 * @param {String} id
 * @param {Integer} pageSize number of items per page
 * @param {Integer} pageNumber
 * @param {Object} filter { title: x, artist: y }
 * @param {String} order mysql order input
 */
export const fetchVolumes = (
  id,
  pageSize = 12,
  pageNumber = 1,
  filter = {},
  order = 'number') =>
  dispatch => {
    const hash = Date.now()
    dispatch(requestVolumes(id, pageSize, pageNumber, filter, order, hash))

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

    return fetch(`${getApiPath('volumes')}?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveVolumes(id, json, hash)))
  }

/**
 * Request total number of volumes
 * @param {String} id
 * @param {Object} filter { title: x, artist: y }
 */
export const countVolumes = (id, filter = {}) => dispatch => {
  const hash = Date.now()
  dispatch(requestNumberOfVolumes(id, filter, hash))

  const { title } = filter
  const where = Object.assign({}, filter)
  if (typeof title !== 'undefined' && title !== '') {
    where.title = {
      regexp: `/.*${title}.*/i`
    }
  }

  return fetch(`${getApiPath('countVolumes')}?where=${JSON.stringify(where)}`)
    .then(res => res.json())
    .then(json => dispatch(receiveNumberOfVolumes(id, json, hash)))
}

/**
 *
 * @param {String} id
 * @param {Integer} pageSize
 * @param {Integer} pageNumber
 * @param {Object} filter
 */
export const loadMoreVolumes = (
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

    dispatch(countVolumes(id, filter))
    dispatch(fetchVolumes(id, pageSize, pageNumber, filter, order))
  }
