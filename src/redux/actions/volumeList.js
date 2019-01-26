import equal from 'deep-equal'
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
    dispatch(requestVolumes(id, pageSize, pageNumber, filter, order))
    const { mangaId, title } = filter

    const where = mangaId ? { mangaId: mangaId } : {}
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

    return fetch(`${getApiPath('volumes')}?filter=${JSON.stringify(filterObj)}`)
      .then(res => res.json())
      .then(json => dispatch(receiveVolumes(id, json)))
  }

/**
 * Request total number of volumes
 * @param {String} id
 * @param {Object} filter { title: x, artist: y }
 */
export const countVolumes = (id, filter = {}) => dispatch => {
  dispatch(requestNumberOfVolumes(id, filter))

  const { title } = filter
  const where = filter
  if (typeof title !== 'undefined' && title !== '') {
    where.title = {
      regexp: '.*' + title + '.*',
      options: 'i'
    }
  }

  return fetch(`${getApiPath('countVolumes')}?where=${JSON.stringify(where)}`)
    .then(res => res.json())
    .then(json => dispatch(receiveNumberOfVolumes(id, json)))
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
      equal(data.filter, filter) &&
      data.pageNumber >= pageNumber
    ) {
      return
    }

    dispatch(countVolumes(id, filter))
    dispatch(fetchVolumes(id, pageSize, pageNumber, filter, order))
  }
