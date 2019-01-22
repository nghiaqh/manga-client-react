import colors from './material-colors'

export const common = {
  padding: 20,
  topBarHeight: 50,
  breakpoints: [400, 641, 1008, 1400],
  transition: (duration = 0.4) => `all ${duration}s ease`,
  boxShadow: (rgba = 'rgba(0,0,0,.2)') => `0 1px 7px ${rgba}`,
  borderRadius: 8
}

export default {
  light: {
    colors: {
      // primary: components (top bar, button)
      // secondary: optional (action button, selection controls, progress bar, link, headlines)
      primary: colors.blue[500],
      primaryDark: colors.blue[700],
      primaryLight: colors.blue[300],
      secondary: colors.grey[700],
      secondaryDark: colors.grey[900],
      secondaryLight: colors.grey[500],
      background: colors.grey[50],
      surface: 'white',
      error: colors.red[900],
      // typography & iconography
      onPrimary: 'white',
      onPrimaryDark: 'white',
      onPrimaryLight: 'white',
      onSecondary: 'white',
      onSecondaryDark: 'white',
      onSecondaryLight: 'white',
      onBackground: colors.grey[800],
      onSurface: colors.grey[800],
      onError: 'white',
      // border
      border: colors.grey[300]
    },
    ...common
  },
  dark: {
    colors: {
      // background
      primary: colors.grey[900],
      primaryDark: 'black',
      primaryLight: colors.grey[700],
      secondary: colors.blue[700],
      secondaryDark: colors.blue[900],
      secondaryLight: colors.blue[500],
      background: colors.grey[900],
      surface: colors.grey[900],
      error: colors.red[900],
      // typography & iconography
      onPrimary: 'white',
      onPrimaryDark: 'white',
      onPrimaryLight: 'white',
      onSecondary: 'white',
      onSecondaryDark: 'white',
      onSecondaryLight: 'white',
      onBackground: 'white',
      onSurface: 'white',
      onError: 'white',
      // border
      border: colors.grey[700]
    },
    ...common
  }
}
