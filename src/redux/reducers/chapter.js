import merge from 'lodash/merge'
import {
  REQUEST_CHAPTER,
  RECEIVE_CHAPTER
} from 'redux/actions/actionTypes'

const initialState = {
  entities: {
    chapters: {}
  }
}

export default (prevState, action) => {
  const state = Object.assign({}, initialState, prevState)
  switch (action.type) {
    case REQUEST_CHAPTER:
      return handleRequestChapter(state, action)
    case RECEIVE_CHAPTER:
      return handleReceiveChapter(state, action)
    default:
      return state
  }
}

const handleRequestChapter = (state, action) => {
  const { id } = action.payload

  return (id !== undefined) ? {
    ...state,
    entities: {
      ...state.entities,
      chapters: {
        ...state.entities.chapters,
        [id]: {
          retrieving: true
        }
      }
    }
  } : state
}

const handleReceiveChapter = (state, action) => {
  const { entities } = action.payload
  return {
    ...state,
    entities: merge({}, state.entities, entities)
  }
}
