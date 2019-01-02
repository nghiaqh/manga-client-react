import merge from 'lodash/merge'
import equal from 'deep-equal'

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
  const { id, receivedAt, entities } = action.payload

  const items = state.withLoadMore[id].items || []
  const { toConcatItems } = state.withLoadMore[id]
  const newItems = toConcatItems ? items.concat(action.items) : action.items

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

export {
  initialState,
  onDataRequested,
  onDataReceived,
  onTotalRequested,
  onTotalReceived
}
