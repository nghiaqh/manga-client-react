export default function toggleFullscreen (element) {
  const fsPrefixes = [
    'fullscreenEnabled',
    'webkitFullscreenEnabled',
    'mozFullscreenEnabled',
    'msFullscreenEnabled'
  ]
  const fePrefixes = [
    'fullscreenElement',
    'webkitFullscreenElement',
    'mozFullScreenElement',
    'msFullscreenElement'
  ]
  const efPrefixes = [
    'exitFullscreen',
    'webkitExitFullscreen',
    'mozCancelFullScreen',
    'msExitFullscreen'
  ]

  const fs = fsPrefixes.filter(fs => element[fs])
  const fe = fePrefixes.filter(fe => element[fe])
  const ef = efPrefixes.filter(ef => document[ef])

  if (element[fs] && !element[fe]) {
    element[fe]()
  } else if (document[ef]) {
    document[ef]()
  }

  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen()
  }
}
