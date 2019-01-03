import React, {
  Component
} from 'react'
import logo from './logo.svg'
import './App.css'
import MangaList from 'components/organisms/MangaList'
import ArtistDetail from 'components/pages/ArtistDetail'

class App extends Component {
  render () {
    return (
      <div className='App' >
        <header className='App-header' >
          <img src={logo}
            className='App-logo'
            alt='logo' />
          <MangaList />
          <ArtistDetail />
        </header>
      </div>
    )
  }
}

export default App
