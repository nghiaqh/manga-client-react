export const createRequestItemsAction = actionType =>
  (id, pageSize, pageNumber, filter, order) => ({
    type: actionType,
    payload: {
      id,
      pageSize,
      pageNumber,
      filter,
      order
    }
  })

export const createReceiveItemsAction = (actionType, normalizeData) => (id, json) => {
  const data = normalizeData(json)
  return {
    type: actionType,
    payload: {
      id,
      items: data.result,
      entities: data.entities,
      receivedAt: Date.now()
    }
  }
}

export const createRequestItemCountAction = actionType => (id, filter) => ({
  type: actionType,
  payload: {
    id,
    filter
  }
})

export const createReceiveItemCountAction = actionType => (id, json) => ({
  type: actionType,
  payload: {
    id,
    total: json.count,
    receivedAt: Date.now()
  }
})

export const requestItemById = actionType => id => ({
  type: actionType,
  payload: { id }
})

export const receiveItemById = actionType => data => ({
  type: actionType,
  payload: {
    data,
    receivedAt: Date.now()
  }
})