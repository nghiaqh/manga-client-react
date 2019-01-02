const apiServer = `${window.location.protocol}//${window.location.hostname}:1881`
const imgServer = `${window.location.protocol}//${window.location.hostname}`

export const apiRoutes = {
  mangas: `${apiServer}/api/mangas`,
  artists: `${apiServer}/api/artists`,
  volumes: `${apiServer}/api/volumes`,
  chapters: `${apiServer}/api/chapters`,
  images: `${apiServer}/api/images`,
  imgServer: `${imgServer}`
}
