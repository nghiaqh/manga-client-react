import React, {
  Component
} from 'react'
import { connect } from 'react-redux'
import { Route, Switch, withRouter } from 'react-router-dom'
import { routes } from 'libs/routes'
import './App.css'

import Home from 'components/pages/Home'
import ArtistDetail from 'components/pages/ArtistDetail'
import MangaDetail from 'components/pages/MangaDetail'

class App extends Component {
  render () {
    return (
      <div className='App' >
        <header className='App-header' >
          {this.setRoutes()}
        </header>
      </div>
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
  const { theme, style } = state

  return {
    theme,
    style
  }
}

export default withRouter(connect(mapStateToProps)(
  App
))
