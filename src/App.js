import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { routes } from 'libs/routes'
import './App.css'
import { ThemeProvider } from 'emotion-theming'
import themes from 'libs/themes'
import Topbar from 'components/organisms/Topbar'
import Sidebar from 'components/organisms/Sidebar'
import Home from 'components/pages/Home'
import ArtistDetail from 'components/pages/ArtistDetail'
import MangaDetail from 'components/pages/MangaDetail'

class App extends Component {
  render () {
    return (
      <ThemeProvider theme={themes[this.props.currentTheme || 'light']}>
        <div className='App' >
          <header><Topbar /></header>
          <aside><Sidebar /></aside>
          <main>{this.setRoutes()}</main>
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
      </Switch>
    )
  }
}

// container
const mapStateToProps = (state) => {
  const { currentTheme, style } = state

  return {
    currentTheme,
    style
  }
}

export default withRouter(connect(mapStateToProps)(
  App
))
