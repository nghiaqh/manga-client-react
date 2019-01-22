import debounce from 'lodash/debounce'
import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { CloseButton } from 'components/atoms/Button'
import SearchBox from './SearchBox'
import MangaSlider from './MangaSlider'
import ChapterList from './ChapterList'
import ArtistList from './ArtistList'

class SearchPanel extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      searchText: false
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.emitChangeDebounced = debounce(this.emitChange, 250)
    this.closeSearch = () => props.toggleSearch(false)

    document.addEventListener('keydown', this.handleKeyDown)

    this.panel = React.createRef()
  }

  render () {
    const { searchText } = this.state
    const { visible } = this.props

    return (
      <Container id='search-overlay' visible={visible}>
        <div className='search-panel' ref={this.panel}>
          <CloseButton onClick={this.closeSearch} />

          <h1 className='truncate'>
            Search
            <span id='search-term'>
              {searchText ? ` "${searchText}"` : ''}
            </span>
          </h1>

          <SearchBox onChange={this.handleSearch} />

          <MangaSlider searchText={searchText} />
          <ChapterList searchText={searchText} />
          <ArtistList searchText={searchText} />
        </div>
      </Container>
    )
  }

  componentDidUpdate (prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.closeSearch()
    }
    if (this.props.visible && !prevProps.visible) {
      this.panel.current.querySelector('input[type=text]').focus()
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
        searchText: value
      })
    }
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
  const { colors, padding, transition } = props.theme
  return {
    boxSizing: 'border-box',
    flexGrow: 1,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    height: `100%`,
    width: '100%',
    overflowY: 'auto',
    background: 'rgba(0, 0, 0, 0.7)',
    transition: transition(0.2),
    visibility: visible ? 'visible' : 'hidden',
    opacity: visible ? 1 : 0,

    '.search-panel': {
      margin: `0 auto`,
      minHeight: '100%',
      maxWidth: 1600,
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

      '> h1': {
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
})

// Redux mapping
const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(SearchPanel)
