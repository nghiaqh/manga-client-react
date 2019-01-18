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

export const createRequestItemByIdAction = actionType => id => ({
  type: actionType,
  payload: { id }
})

export const createReceiveItemByIdAction = (actionType, normalizeData) => json => {
  json.retrieving = false

  if (!normalizeData) {
    return {
      type: actionType,
      payload: {
        data: json,
        receivedAt: Date.now()
      }
    }
  }
  const data = normalizeData([json])

  return {
    type: actionType,
    payload: {
      items: data.result,
      entities: data.entities,
      receivedAt: Date.now()
    }
  }
}
