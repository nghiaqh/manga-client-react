import {
  REQUEST_MANGA,
  RECEIVE_MANGA
} from 'redux/actions/actionTypes'

const initialState = {
  entities: {
    mangas: {}
  }
}

export default (prevState, action) => {
  const state = Object.assign({}, initialState, prevState)
  switch (action.type) {
    case REQUEST_MANGA:
      return handleRequestManga(state, action)
    case RECEIVE_MANGA:
      return handleReceiveManga(state, action)
    default:
      return state
  }
}

const handleRequestManga = (state, action) => {
  const { id } = action.payload
  return {
    ...state,
    entities: {
      ...state.entities,
      mangas: {
        ...state.entities.mangas,
        [id]: {
          retrieving: true
        }
      }
    }
  }
}

const handleReceiveManga = (state, action) => {
  const { data, receivedAt } = action.payload
  const now = new Date()
  const then = new Date(data.modifiedAt)
  data.isNew = (now - then) / (1000 * 3600 * 24) <= 10
  data.retrieving = false
  data.receivedAt = receivedAt
  const id = data.id

  return {
    ...state,
    entities: {
      ...state.entities,
      mangas: {
        ...state.entities.mangas,
        [id]: Object.assign({}, state.entities.mangas[id], data)
      }
    }
  }
}
