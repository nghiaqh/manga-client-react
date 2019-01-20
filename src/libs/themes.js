const colors = {
  blue: {
    50: '#e3f2fd',
    100: '#bbdefb',
    200: '#90Caf9',
    300: '#64b5f6',
    400: '#42a5f5',
    500: '#2196f3',
    600: '#1e88e5',
    700: '#1976d2',
    800: '#1565C0',
    900: '#0d47a1',
    'a100': '#82b1ff',
    'a200': '#448aff',
    'a400': '#2979ff',
    'a700': '#2962ff'
  },
  orange: {
    50: '#fff3e0',
    100: '#ffe0b2',
    200: '#ffcc80',
    300: '#ffb74d',
    400: '#ffa726',
    500: '#ff9800',
    600: '#fb8c00',
    700: '#f57c00',
    800: '#ef6c00',
    900: '#e65100',
    'a100': '#ffd180',
    'a200': '#ffab40',
    'a400': '#ff9100',
    'a700': '#ff6d00'
  },
  grey: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#eeeeee',
    300: '#e0e0e0',
    400: '#bdbdbd',
    500: '#9e9e9e',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121'
  }
}

export const common = {
  padding: 20,
  topBarHeight: 48,
  breakpoints: [400, 641, 1008, 1400]
}

export default {
  light: {
    colors: {
      primary: colors.blue[500],
      primaryVariant: colors.blue[700],
      secondary: colors.orange[200],
      secondaryVariant: colors.orange[400],
      background: colors.blue[50],
      surface: colors.blue[100],
      onPrimary: colors.grey[50],
      onSecondary: colors.grey[50],
      onBackground: colors.grey[800],
      onSurface: colors.grey[800]
    },
    ...common
  },
  dark: {
    colors: {
      primary: colors.grey[800],
      primaryVariant: colors.grey[900],
      secondary: colors.orange[200],
      secondaryVariant: colors.orange[400],
      background: colors.grey[600],
      surface: colors.grey[700],
      onPrimary: colors.grey[50],
      onSecondary: colors.grey[50],
      onBackground: colors.grey[50],
      onSurface: colors.grey[50]
    },
    ...common
  }
}
