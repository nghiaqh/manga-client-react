import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loadMoreMangas } from 'redux/actions/mangaList'
import { loadMoreArtists } from 'redux/actions/artistList'
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
  }

  render () {
    return (
      <Container>
        <input id='search-box' type='text'
          onChange={this.handleSearch}
          onFocus={this.showSearch} />

        <div id='search-results'
          className={this.state.showResults ? 'visible' : 'hidden'}>
          <div class='search-results__content'>
            <Button id='search-results--close-btn' onClick={this.closeSearch}>
              Close
            </Button>
            <div>Search results for {this.state.searchText}</div>
            <MangaList searchText={this.state.searchText} />
          </div>
        </div>
      </Container>
    )
  }

  handleSearch (e) {
    this.setState({
      searchText: e.currentTarget.value,
      showResults: true
    })
  }

  showSearch (e) {
    this.setState({ showResults: true })
  }

  closeSearch (e) {
    this.setState({ showResults: false })
  }
}

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
    <>
      <h2>Mangas</h2>

      <ContentView
        id={`mangas-search`}
        entityType='mangas'
        filter={filter}
        pageSize={12}
        loadMoreFunc={loadMoreMangas}
        renderItem={renderMangaCard}
        layout='slider'
      />
    </>
  )
}

const Container = styled.header(props => {
  const { colors, padding, topBarHeight } = props.theme
  return {
    boxSizing: 'border-box',
    flexGrow: 1,

    a: {
      color: colors.onPrimary,
      textDecoration: 'none'
    },

    '#search-box': {
      width: '90%',
      maxWidth: 1000,
      margin: '0 auto',
      display: 'block'
    },

    '#search-results': {
      position: 'absolute',
      top: topBarHeight,
      left: 0,
      height: `calc(100% - ${topBarHeight}px)`,
      width: '100%',
      overflowY: 'auto',
      background: 'rgba(0, 0, 0, 0.7)',

      '&.hidden': {
        display: 'none'
      },

      '.search-results__content': {
        margin: `0 auto`,
        minHeight: '100%',
        maxWidth: 1600,
        padding: `${padding}px`,
        backgroundColor: colors.background,
        color: colors.onBackground,
        boxSizing: 'border-box',

        '> button': {
          cursor: 'pointer',
          float: 'right'
        },

        '> div': {
          clear: 'both'
        }
      }
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Search)
