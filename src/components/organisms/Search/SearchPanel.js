import debounce from 'lodash/debounce'
import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CloseButton } from 'components/atoms/Button'
import SearchBox from './SearchBox'
import MangaSlider from 'components/organisms/MangaSlider'
import ChapterList from 'components/organisms/ChapterList'
import ArtistList from 'components/organisms/ArtistList'

class SearchPanel extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      searchText: null
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.emitChangeDebounced = debounce(this.emitChange, 250)
    this.closeSearch = () => props.toggleSearch(false)
    this.searchBox = React.createRef()
  }

  render () {
    const { searchText } = this.state
    const { visible } = this.props

    return (
      <Container id='search-overlay' visible={visible}>
        <div className='search-panel'>
          <div className='search-header'>
            <SearchBox onChange={this.handleSearch} ref={this.searchBox} />
            <CloseButton onClick={this.closeSearch} />
          </div>

          { searchText !== null && searchText !== '' &&
            <>
              <div className='search-results'>
                <MangaSlider id={`mangas-search-${searchText}`}
                  filter={{ title: searchText }}>
                  <h2>Mangas</h2>
                </MangaSlider>
              </div>
              <div className='search-results'>
                <ChapterList id={`chapters-search-${searchText}`}
                  filter={{
                    title: searchText,
                    number: { gt: 0 }
                  }}
                  pageSize={6} >
                  <h2>Chapters</h2>
                </ChapterList>
              </div>
              <div className='search-results'>
                <ArtistList id={`artists-search-${searchText}`}
                  filter={{ name: searchText }} >
                  <h2>Artists</h2>
                </ArtistList>
              </div>
            </>
          }
        </div>
      </Container>
    )
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
    this.bodyOverflow = document.body.style.overflow
  }

  componentDidUpdate (prevProps) {
    const input = this.searchBox.current
    const { location, visible } = this.props

    if (location.pathname !== prevProps.location.pathname) {
      this.closeSearch()
    }

    if (visible && !prevProps.visible) {
      setTimeout(() => { input && input.focus() }, 50)
      document.body.style.overflow = 'hidden'
    }

    if (!visible && prevProps.visible) {
      document.body.style.overflow = this.bodyOverflow
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
    this.setState({
      searchText: value.trim()
    })
  }

  handleKeyDown (e) {
    switch (e.key) {
      case 'Escape':
        e.stopPropagation()
        return this.closeSearch()
      default:
        return null
    }
  }
}

// Styling
const Container = styled.div(props => {
  const { visible } = props
  const { colors, padding, transition, boxShadow, topBarHeight } = props.theme
  return {
    boxSizing: 'border-box',
    flexGrow: 1,
    zIndex: 1,
    position: 'fixed',
    top: 0,
    height: '100%',
    width: '100%',
    overflowY: 'auto',
    background: 'rgba(0, 0, 0, 0.7)',
    transition: transition(0.2),
    visibility: visible ? 'visible' : 'hidden',
    opacity: visible ? 1 : 0,

    '.search-panel': {
      margin: '0 auto',
      minHeight: topBarHeight,
      maxWidth: 1600,
      backgroundColor: colors.background,
      color: colors.onBackground,
      boxSizing: 'border-box',
      padding: '5px 0',
      boxShadow: boxShadow(),

      a: {
        color: colors.onBackground
      },

      '.search-header': {
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',

        '> div': {
          flexGrow: 1,
          justifyContent: 'center'
        },

        'button': {
          margin: `0 ${padding}px`,
          cursor: 'pointer'
        }
      },

      'div.search-results': {
        clear: 'both',
        padding: `${padding}px 0`,

        h2: {
          marginTop: 0
        },

        '.content-list, .content-grid, .content-slider h2': {
          paddingLeft: padding,
          paddingRight: padding
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

export default connect(mapStateToProps)(SearchPanel)
