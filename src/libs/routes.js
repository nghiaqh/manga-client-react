
import pathToRegexp from 'path-to-regexp'

export const routes = {
  home: '/',
  mangas: '/mangas',
  mangaDetail: '/mangas/:mangaId',
  artists: '/artists',
  artistDetail: '/artists/:artistId',
  mangaReader: '/mangas/:mangaId/:chapterId/:imageNumber?'
}

export const toUrl = (routeId, params = {}) => pathToRegexp.compile(routes[routeId])(params)
