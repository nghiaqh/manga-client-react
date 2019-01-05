import merge from 'lodash/merge'
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
  const { entities } = action.payload

  return {
    ...state,
    entities: merge(state.entities, entities)
  }
}
