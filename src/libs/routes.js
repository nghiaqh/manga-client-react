
import pathToRegexp from 'path-to-regexp'

export const routes = {
  mangas: '/mangas',
  mangaById: '/mangas/:mangaId',
  artists: '/artists',
  artistById: 'artists/:artistId',
  chapterById: '/mangas/:mangaId/c/:chapterId',
  imageById: '/mangas/:mangaId/c/:chapterId/:imageId'
}

export const toUrl = (routeId, params = {}) => pathToRegexp.compile(routes[routeId])(params)
