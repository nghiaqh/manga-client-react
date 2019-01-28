import colors from './material-colors'

export const common = {
  padding: 20,
  topBarHeight: 50,
  breakpoints: [400, 641, 1008, 1400],
  transition: (duration = 0.4) => `all ${duration}s ease`,
  boxShadow: (rgba = 'rgba(0,0,0,.2)') => `0 1px 7px ${rgba}`,
  borderRadius: 5,
  highlight: 'rgba(255, 255, 255, 0.1)'
}

export default {
  'light blue': {
    colors: {
      // primary: components (top bar, button)
      // secondary: optional (action button, selection controls, progress bar, link, headlines)
      primary: colors.lightblue[500],
      primaryDark: colors.lightblue[700],
      primaryLight: colors.lightblue[300],
      secondary: colors.pink['a100'],
      secondaryDark: colors.pink['a200'],
      secondaryLight: colors.pink['a100'],
      background: colors.grey[50],
      surface: 'white',
      error: colors.red[900],
      // typography & iconography
      onPrimary: 'white',
      onPrimaryDark: 'white',
      onPrimaryLight: 'white',
      onSecondary: 'black',
      onSecondaryDark: 'black',
      onSecondaryLight: 'black',
      onBackground: colors.grey[800],
      onSurface: colors.grey[800],
      onError: 'white',
      // border
      border: colors.grey[400]
    },
    ...common
  },
  'lime': {
    colors: {
      // background
      primary: colors.lime[500],
      primaryDark: colors.lime[600],
      primaryLight: colors.lime[300],
      secondary: colors.teal[500],
      secondaryDark: colors.teal[700],
      secondaryLight: colors.teal[300],
      background: colors.lime[100],
      surface: colors.grey[50],
      error: colors.red[900],
      // typography & iconography
      onPrimary: colors.grey[900],
      onPrimaryDark: 'white',
      onPrimaryLight: colors.grey[900],
      onSecondary: 'white',
      onSecondaryDark: colors.grey[50],
      onSecondaryLight: colors.grey[900],
      onBackground: colors.grey[800],
      onSurface: colors.grey[800],
      onError: 'white',
      // border
      border: colors.grey[400]
    },
    ...common
  },
  'low chroma': {
    colors: {
      // background
      primary: colors.grey[500],
      primaryDark: colors.grey[600],
      primaryLight: colors.grey[300],
      secondary: colors.lightblue[300],
      secondaryDark: colors.lightblue[500],
      secondaryLight: colors.lightblue[100],
      background: 'white',
      surface: colors.grey[50],
      error: colors.red[900],
      // typography & iconography
      onPrimary: 'white',
      onPrimaryDark: 'white',
      onPrimaryLight: colors.grey[900],
      onSecondary: 'white',
      onSecondaryDark: colors.grey[50],
      onSecondaryLight: colors.grey[900],
      onBackground: colors.grey[800],
      onSurface: colors.grey[800],
      onError: 'white',
      // border
      border: colors.grey[400]
    },
    ...common
  },
  'night': {
    colors: {
      // background
      primary: colors.grey[700],
      primaryDark: colors.grey[900],
      primaryLight: colors.grey[600],
      secondary: colors.amber[500],
      secondaryDark: colors.amber[700],
      secondaryLight: colors.amber[300],
      background: colors.grey[800],
      surface: colors.grey[900],
      error: colors.red[900],
      // typography & iconography
      onPrimary: 'white',
      onPrimaryDark: 'white',
      onPrimaryLight: 'white',
      onSecondary: 'black',
      onSecondaryDark: 'black',
      onSecondaryLight: 'black',
      onBackground: 'white',
      onSurface: 'white',
      onError: 'white',
      // border
      border: colors.grey[700]
    },
    ...common
  }
}
