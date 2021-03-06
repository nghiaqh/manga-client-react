import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { routes } from 'libs/routes'
import { Helmet } from 'react-helmet'
import { ThemeProvider } from 'emotion-theming'
import styled from '@emotion/styled/macro'
import themes from 'libs/themes'
import Topbar from 'components/organisms/Topbar'
import Home from 'components/pages/Home'
import ArtistDetail from 'components/pages/ArtistDetail'
import MangaDetail from 'components/pages/MangaDetail'
import MangaReader from 'components/pages/MangaReader'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faSearch,
  faCog,
  faTimes,
  faExpand,
  faCheck,
  faEye,
  faEyeSlash,
  faColumns,
  faTh,
  faSortNumericDown,
  faSortNumericUp,
  faThList,
  faAlignLeft,
  faAlignRight,
  faSpinner
} from '@fortawesome/free-solid-svg-icons'

library.add(
  faSearch,
  faCog,
  faTimes,
  faExpand,
  faCheck,
  faEye,
  faEyeSlash,
  faColumns,
  faTh,
  faSortNumericDown,
  faSortNumericUp,
  faThList,
  faAlignLeft,
  faAlignRight,
  faSpinner
)

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sideBarDisplay: true
    }
    this.defaultTheme = Object.keys(themes)[0]
  }

  render () {
    const theme = themes[this.props.currentTheme || this.defaultTheme]
    return (
      <>
        {/* Workaround for https://github.com/nfl/react-helmet/issues/373 */}
        <Helmet
          title={'Latest mangas | Manga Reader'}
          meta={[
            {
              name: 'description',
              content: 'Latest mangas'
            }
          ]} />

        <ThemeProvider theme={theme}>
          <Container id='App'>
            <Topbar location={this.props.location} />
            {this.setRoutes()}
          </Container>
        </ThemeProvider>
      </>
    )
  }

  componentDidUpdate (prevProps) {
    if (prevProps.currentTheme !== this.props.currentTheme) {
      const theme = themes[this.props.currentTheme || this.defaultTheme]
      document.body.style.backgroundColor = theme.colors.background
    }
  }

  setRoutes () {
    return (
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.mangaDetail} component={MangaDetail} />
        <Route exact path={routes.artistDetail} component={ArtistDetail} />
        <Route exact path={routes.mangaReader} component={MangaReader} />
      </Switch>
    )
  }
}

// style
const Container = styled.div(props => {
  return {
    height: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    background: props.theme.colors.background,
    color: props.theme.colors.onBackground
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
