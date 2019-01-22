import debounce from 'lodash/debounce'
import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadMoreMangas } from 'redux/actions/mangaList'
import { loadMoreChapters } from 'redux/actions/chapterList'
import { loadMoreArtists } from 'redux/actions/artistList'
import { toUrl } from 'libs/routes'
import Button from 'components/atoms/Button'
import ContentView from 'components/organisms/ContentView'
import MangaCard from 'components/molecules/MangaCard'

class Search extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      searchText: false,
      showResults: false
    }

    this.handleSearch = this.handleSearch.bind(this)
    this.closeSearch = this.closeSearch.bind(this)
    this.showSearch = this.showSearch.bind(this)
    this.emitChangeDebounced = debounce(this.emitChange, 250)
    this.handleKeyDown = this.handleKeyDown.bind(this)

    document.addEventListener('keydown', this.handleKeyDown)
  }

  render () {
    const { searchText } = this.state
    return (
      <Container>
        <input id='search-box' type='text' placeholder='Search mangas, chapters, artists'
          onChange={this.handleSearch}
          onFocus={this.showSearch} />

        <div id='search-results'
          className={this.state.showResults ? 'visible' : 'hidden'}>
          <div className='search-results__content'>
            <Button id='search-results--close-btn' onClick={this.closeSearch}>
              Close [ESC]
            </Button>
            <h2>
              Search
              <span id='search-term'>
                {searchText ? ` "${searchText}"` : ''}
              </span>
            </h2>
            <MangaList searchText={this.state.searchText} />
            <ChapterList searchText={this.state.searchText} />
            <ArtistList searchText={this.state.searchText} />
          </div>
        </div>
      </Container>
    )
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ showResults: false })
    }
  }

  componentWillUnmount () {
    this.emitChangeDebounced.cancel()
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  handleSearch (event) {
    this.emitChangeDebounced(event.target.value)
  }

  emitChange (value) {
    if (value !== '') {
      this.setState({
        searchText: value,
        showResults: true
      })
    }
  }

  showSearch (e) {
    this.setState({ showResults: true })
  }

  closeSearch (e) {
    this.setState({ showResults: false })
  }

  handleKeyDown (e) {
    switch (e.key) {
      case 'Escape':
        e.stopPropagation()
        return this.setState({ showResults: false })
      default:
        return null
    }
  }
}

// Sub components
function MangaList ({ searchText }) {
  if (!searchText) return null

  const filter = { title: searchText }
  const renderMangaCard = manga => (
    <MangaCard key={manga.id} manga={manga} size={{
      height: 280,
      width: 180
    }} />
  )
  return (
    <div>
      <h2>Mangas</h2>

      <ContentView
        id={`mangas-search-${searchText}`}
        entityType='mangas'
        filter={filter}
        pageSize={12}
        loadMoreFunc={loadMoreMangas}
        renderItem={renderMangaCard}
        layout='slider'
      />
    </div>
  )
}

function ChapterList ({ searchText }) {
  if (!searchText) return null

  const filter = { title: searchText, number: { gt: 0 } }
  const renderChapter = chapter => (
    <Link
      key={chapter.id}
      to={toUrl('imageViewer', {
        mangaId: chapter.mangaId,
        chapterId: chapter.id,
        imageId: 1
      })}
    >
      {chapter.shortTitle} [ch.{chapter.number}]
    </Link>
  )
  return (
    <div>
      <h2>Chapters</h2>

      <ContentView
        id={`chapters-search-${searchText}`}
        entityType='chapters'
        filter={filter}
        pageSize={12}
        loadMoreFunc={loadMoreChapters}
        renderItem={renderChapter}
        layout='list'
      />
    </div>
  )
}

function ArtistList ({ searchText }) {
  if (!searchText) return null

  const filter = { name: searchText }
  const renderArtist = artist => (
    <Link
      key={artist.id}
      to={toUrl('artistDetail', { artistId: artist.id })}>
      {artist.name}
    </Link>
  )
  return (
    <div>
      <h2>Artists</h2>

      <ContentView
        id={`artists-search-${searchText}`}
        entityType='artists'
        filter={filter}
        pageSize={12}
        loadMoreFunc={loadMoreArtists}
        renderItem={renderArtist}
        layout='list'
      />
    </div>
  )
}

// Styling
const Container = styled.div(props => {
  const { colors, padding, topBarHeight, transition } = props.theme
  return {
    boxSizing: 'border-box',
    flexGrow: 1,
    zIndex: 1,

    '#search-box': {
      border: `1px solid ${colors.border}`,
      outline: 'none',
      background: colors.background,
      color: colors.onBackground,
      padding: padding / 2,
      width: '90%',
      maxWidth: 600,
      margin: '0 auto',
      display: 'block',

      '&:hover': {
      }
    },

    '#search-results': {
      position: 'absolute',
      top: topBarHeight,
      left: 0,
      height: `calc(100% - ${topBarHeight}px)`,
      width: '100%',
      overflowY: 'auto',
      background: 'rgba(0, 0, 0, 0.7)',
      transition: transition(0.2),
      visibility: 'visible',
      opacity: 1,

      '&.hidden': {
        visibility: 'hidden',
        opacity: 0
      },

      '.search-results__content': {
        margin: `0 auto`,
        minHeight: '100%',
        maxWidth: 1200,
        backgroundColor: colors.background,
        color: colors.onBackground,
        boxSizing: 'border-box',

        a: {
          color: colors.onBackground
        },

        '> button': {
          margin: `${padding}px`,
          cursor: 'pointer',
          float: 'right'
        },

        '> h2': {
          backgroundColor: colors.surface,
          margin: 0,
          padding
        },

        '> div': {
          clear: 'both',
          padding,

          h2: {
            marginTop: 0
          }
        }
      }
    }
  }
})

// Redux mapping
const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Search)
