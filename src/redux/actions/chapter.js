import {
  REQUEST_CHAPTER,
  RECEIVE_CHAPTER
} from './actionTypes'
import {
  createRequestItemByIdAction,
  createReceiveItemByIdAction
} from './actionCreators'
import { normalizeData } from 'redux/actions/chapterList'
import getApiPath from 'libs/apiRoutes'
import get from 'lodash/get'
import findKey from 'lodash/findKey'

const requestChapter = createRequestItemByIdAction(REQUEST_CHAPTER)
const receiveChapter = createReceiveItemByIdAction(RECEIVE_CHAPTER, normalizeData)

export const fetchChapterById = id => dispatch => {
  dispatch(requestChapter(id))
  return fetch(getApiPath('chapterById', { id }))
    .then(response => response.json())
    .then(json => dispatch(receiveChapter(json)))
}

export const fetchChapterByIdIfNeeded = id => (dispatch, getState) => {
  const { chapters } = getState().entities

  if (get(chapters, id) === undefined) {
    dispatch(fetchChapterById(id))
  }
}

export const fetchChapterOfManga = (mangaId, number) => dispatch => {
  dispatch(requestChapter())

  const filterObj = { where: { mangaId, number } }

  return fetch(`${getApiPath('chapters')}?filter=${JSON.stringify(filterObj)}`)
    .then(response => response.json())
    .then(json => json.length && dispatch(receiveChapter(json[0])))
}

export const fetchChapterOfMangaIfNeeded = (mangaId, number) => (dispatch, getState) => {
  const { chapters } = getState().entities

  if (findKey(chapters, { mangaId, number }) === undefined) {
    dispatch(fetchChapterOfManga(mangaId, number))
  }
}
