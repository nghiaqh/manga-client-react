import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { routes } from 'libs/routes'
import { ThemeProvider } from 'emotion-theming'
import themes from 'libs/themes'
import Topbar from 'components/organisms/Topbar'
import Sidebar from 'components/organisms/Sidebar'
import Home from 'components/pages/Home'
import ArtistDetail from 'components/pages/ArtistDetail'
import MangaDetail from 'components/pages/MangaDetail'
import ImageViewer from 'components/pages/ImageViewer'
import Composition from 'components/organisms/Composition'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      sideBarDisplay: true
    }

    this.toggleSidebar = this.toggleSidebar.bind(this)
  }

  render () {
    const theme = themes[this.props.currentTheme || 'light']
    return (
      <ThemeProvider theme={theme}>
        <div className='App' >
          <Topbar toggleSidebar={this.toggleSidebar} />
          <Composition>
            <Sidebar id='main-sidebar' display={this.state.sideBarDisplay} />
            <main>{this.setRoutes()}</main>
          </Composition>
        </div>
      </ThemeProvider>
    )
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

  toggleSidebar (event) {
    event.preventDefault()
    this.setState(state => ({
      sideBarDisplay: !state.sideBarDisplay
    }))
  }
}

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
