import merge from 'lodash/merge'
import equal from 'deep-equal'
import {
  REQUEST_ARTISTS,
  RECEIVE_ARTISTS,
  REQUEST_NUMBER_OF_ARTISTS,
  RECEIVE_NUMBER_OF_ARTISTS,
  REQUEST_MANGAS,
  RECEIVE_MANGAS,
  REQUEST_NUMBER_OF_MANGAS,
  RECEIVE_NUMBER_OF_MANGAS,
  REQUEST_CHAPTERS,
  RECEIVE_CHAPTERS,
  REQUEST_NUMBER_OF_CHAPTERS,
  RECEIVE_NUMBER_OF_CHAPTERS,
  REQUEST_VOLUMES,
  RECEIVE_VOLUMES,
  REQUEST_NUMBER_OF_VOLUMES,
  RECEIVE_NUMBER_OF_VOLUMES,
  REQUEST_IMAGES,
  RECEIVE_IMAGES,
  REQUEST_NUMBER_OF_IMAGES,
  RECEIVE_NUMBER_OF_IMAGES
} from 'redux/actions/actionTypes'

const initialState = {
  entities: {},
  withLoadMore: {}
}

const onDataRequested = (state, action) => {
  const {
    order,
    filter,
    pageSize,
    pageNumber,
    id
  } = action.payload

  const prevFilter = state.withLoadMore[id].filter || {}
  const toConcatItems = equal(filter, prevFilter)

  return {
    ...state,
    withLoadMore: {
      ...state.withLoadMore,
      [id]: {
        ...state.withLoadMore[id],
        pageNumber,
        pageSize,
        filter,
        order,
        retrievingItems: true,
        toConcatItems
      }
    }
  }
}

const onDataReceived = (state, action) => {
  const { id, receivedAt, entities, items } = action.payload

  const currentItems = state.withLoadMore[id].items || []
  const { toConcatItems } = state.withLoadMore[id]
  const newItems = toConcatItems ? currentItems.concat(items) : items

  return {
    ...state,
    withLoadMore: {
      ...state.withLoadMore,
      [id]: {
        ...state.withLoadMore[id],
        items: newItems,
        retrievingItems: false,
        receivedItemsAt: receivedAt
      }
    },
    entities: merge(state.entities, entities)
  }
}

const onTotalRequested = (state, action) => {
  const { id } = action.payload

  return {
    ...state,
    withLoadMore: {
      ...state.withLoadMore,
      [id]: {
        ...state.withLoadMore[id],
        retrievingTotal: true
      }
    }
  }
}

const onTotalReceived = (state, action) => {
  const { id, total, receivedAt } = action.payload

  return {
    ...state,
    withLoadMore: {
      ...state.withLoadMore,
      [id]: {
        ...state.withLoadMore[id],
        total,
        retrievingTotal: false,
        retrievingTotalAt: receivedAt
      }
    }
  }
}

export default (prevState, action) => {
  const state = Object.assign({}, initialState, prevState)
  switch (action.type) {
    case REQUEST_ARTISTS:
    case REQUEST_MANGAS:
    case REQUEST_CHAPTERS:
    case REQUEST_VOLUMES:
    case REQUEST_IMAGES:
      return onDataRequested(state, action)
    case RECEIVE_ARTISTS:
    case RECEIVE_MANGAS:
    case RECEIVE_CHAPTERS:
    case RECEIVE_VOLUMES:
    case RECEIVE_IMAGES:
      return onDataReceived(state, action)
    case REQUEST_NUMBER_OF_ARTISTS:
    case REQUEST_NUMBER_OF_MANGAS:
    case REQUEST_NUMBER_OF_CHAPTERS:
    case REQUEST_NUMBER_OF_VOLUMES:
    case REQUEST_NUMBER_OF_IMAGES:
      return onTotalRequested(state, action)
    case RECEIVE_NUMBER_OF_ARTISTS:
    case RECEIVE_NUMBER_OF_MANGAS:
    case RECEIVE_NUMBER_OF_CHAPTERS:
    case RECEIVE_NUMBER_OF_VOLUMES:
    case RECEIVE_NUMBER_OF_IMAGES:
      return onTotalReceived(state, action)
    default:
      return state
  }
}
