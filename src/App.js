import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { routes } from 'libs/routes'
import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/styled/macro'
import themes from 'libs/themes'
import Topbar from 'components/organisms/Topbar'
import Home from 'components/pages/Home'
import ArtistDetail from 'components/pages/ArtistDetail'
import MangaDetail from 'components/pages/MangaDetail'
import ImageViewer from 'components/pages/ImageViewer'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sideBarDisplay: true
    }
  }

  render () {
    const theme = themes[this.props.currentTheme || 'light']
    return (
      <ThemeProvider theme={theme}>
        <Container>
          <Topbar />
          <main>{this.setRoutes()}</main>
        </Container>
      </ThemeProvider>
    )
  }

  componentDidUpdate (prevProps) {
    if (prevProps.currentTheme !== this.props.currentTheme) {
      const theme = themes[this.props.currentTheme || 'light']
      document.body.style.backgroundColor = theme.colors.background
    }
  }

  setRoutes () {
    return (
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.mangaDetail} component={MangaDetail} />
        <Route exact path={routes.artistDetail} component={ArtistDetail} />
        <Route exact path={routes.imageViewer} component={ImageViewer} />
      </Switch>
    )
  }
}

// style
const Container = styled.div(props => {
  return {
    height: '-webkit-fill-available',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    background: props.theme.colors.background,
    color: props.theme.colors.onBackground,

    main: {
      flexGrow: 1,
      minHeight: 0,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column'
    }
  }
})

// container
const mapStateToProps = (state) => {
  const { theme, style } = state

  return {
    currentTheme: theme,
    style
  }
}

export default withRouter(connect(mapStateToProps)(
  App
))
