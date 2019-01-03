import { SET_BREADCRUMB } from 'redux/actions/actionTypes'

const initialState = {
  breadcrumb: [{
    text: 'Home',
    url: '/',
    visibleOnCompactMode: false
  }]
}

const breadcrumbReducer = (prevState = {}, action) => {
  const state = Object.assign({}, initialState, prevState)
  if (action.type === SET_BREADCRUMB) {
    const breadcrumb = createBreadcrumb(state, action.payload.pathname)

    return {
      ...state,
      breadcrumb
    }
  } else {
    return state
  }
}

function createBreadcrumb (state, pathname) {
  let breadcrumb = Object.assign([], initialState.breadcrumb)
  const parts = pathname.split('/').splice(1)

  if (pathname !== '/') {
    const type = parts[0]
    const id = parts[1]
    const nameOrTitle = type === 'mangas' ? 'title' : 'name'

    const trails = parts.map((item, index) => {
      const text = index === 1 ? state.entities[type][id][nameOrTitle] : item
      const url = index === parts.length - 1
        ? '#'
        : `/${parts.slice(0, index + 1).join('/')}`
      const visibleOnCompactMode =
        (parts.length === 1 && index === 0) ||
        (parts.length > 1 && index === 1)

      return {
        text,
        url,
        visibleOnCompactMode,
        prefix: (visibleOnCompactMode && index)
          ? `${type.slice(0, -1)} `
          : ''
      }
    })

    breadcrumb = breadcrumb.concat(trails)
    breadcrumb[0].visibleOnCompactMode = false
  } else {
    breadcrumb[0].visibleOnCompactMode = true
  }

  return breadcrumb
}

export default breadcrumbReducer
