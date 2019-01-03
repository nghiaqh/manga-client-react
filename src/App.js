import React, {
  Component
} from 'react'
import logo from './logo.svg'
import './App.css'
import ArtistDetail from 'components/pages/ArtistDetail'
import MangaDetail from 'components/pages/MangaDetail'

class App extends Component {
  render () {
    return (
      <div className='App' >
        <header className='App-header' >
          <img src={logo}
            className='App-logo'
            alt='logo' />
          <ArtistDetail /><br />
          <MangaDetail />
        </header>
      </div>
    )
  }
}

export default App
