import {
  REQUEST_ARTIST,
  RECEIVE_ARTIST
} from 'redux/actions/actionTypes'

const initialState = {
  entities: {
    artists: {}
  }
}

export default (prevState, action) => {
  const state = Object.assign({}, initialState, prevState)
  switch (action.type) {
    case REQUEST_ARTIST:
      return handleRequestArtistAction(state, action)
    case RECEIVE_ARTIST:
      return handleReceiveArtistAction(state, action)
    default:
      return state
  }
}

const handleRequestArtistAction = (state, action) => {
  const { id } = action.payload
  return {
    ...state,
    entities: {
      ...state.entities,
      artists: {
        ...state.entities.artists,
        [id]: {
          retrieving: true
        }
      }
    }
  }
}

const handleReceiveArtistAction = (state, action) => {
  const { data, receivedAt } = action.payload
  data.retrieving = false
  data.receivedAt = receivedAt
  const id = data.id

  return {
    ...state,
    entities: {
      ...state.entities,
      artists: {
        ...state.entities.artists,
        [id]: Object.assign({}, state.entities.artists[id], data)
      }
    }
  }
}
