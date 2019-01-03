import React, {
  Component
} from 'react'
import logo from './logo.svg'
import './App.css'
import ArtistDetail from 'components/pages/ArtistDetail'
import MangaList from 'components/organisms/MangaList'

class App extends Component {
  render () {
    return (
      <div className='App' >
        <header className='App-header' >
          <img src={logo}
            className='App-logo'
            alt='logo' />
          <ArtistDetail /><br />
          <MangaList />
        </header>
      </div>
    )
  }
}

export default App
