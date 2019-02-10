import pathToRegexp from 'path-to-regexp'

const apiServer = `${window.location.protocol}//${window.location.hostname}\\:8181`
const imgServer = `${window.location.protocol}//${window.location.hostname}`

const apiRoutes = {
  mangas: `${apiServer}/api/mangas`,
  mangaById: `${apiServer}/api/mangas/:id`,
  countMangas: `${apiServer}/api/mangas/count`,

  artists: `${apiServer}/api/artists`,
  artistById: `${apiServer}/api/artists/:id`,
  countArtists: `${apiServer}/api/artists/count`,

  volumes: `${apiServer}/api/volumes`,
  volumeById: `${apiServer}/api/volumes/:id`,
  countVolumes: `${apiServer}/api/volumes/count`,

  chapters: `${apiServer}/api/chapters`,
  countChapters: `${apiServer}/api/chapters/count`,
  chapterById: `${apiServer}/api/chapters/:id`,

  images: `${apiServer}/api/images`,
  countImages: `${apiServer}/api/images/count`,
  imageById: `${apiServer}/api/images/:id`,
  image: `${imgServer}/:src`
}

export const getImageUrl = (src, type) => {
  if (type && src.search('.webp') < 0) {
    const parts = src.split('/')
    const fileName = parts.pop()
    return `${imgServer}${parts.join('/')}/thumbnails/${type}/${fileName}`
  } else {
    return `${imgServer}${src}`
  }
}

export default (id, params = {}) => pathToRegexp.compile(apiRoutes[id])(params)
