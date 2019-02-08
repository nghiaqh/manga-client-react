// import findKey from 'lodash/findKey'
import get from 'lodash/get'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toggleFullscreen from 'libs/fullscreen'
import { toUrl } from 'libs/routes'
import { fetchMangaByIdIfNeeded } from 'redux/actions/manga'
import {
  fetchChapterByIdIfNeeded,
  fetchChapterOfMangaIfNeeded
} from 'redux/actions/chapter'
import Button from 'components/atoms/Button'
import ExtraSlide from './ExtraSlide'
import ImageSlider from './ImageSlider'
import ImageGrid from './ImageGrid'

const storageKey = '[manga-client-react] slider-direction'

class MangaReader extends React.PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      showExtraSlide: false,
      viewMode: 'slider',
      showThumbnail: false,
      sliderDirection: props.direction || localStorage.getItem(storageKey) || 'rtl'
    }

    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.fetchNextChapter = this.fetchNextChapter.bind(this)
    this.toggleThumbnailGrid = this.toggleThumbnailGrid.bind(this)
    this.toggleImageSlider = this.toggleImageSlider.bind(this)
    this.toggleSliderDirection = this.toggleSliderDirection.bind(this)
  }

  componentWillMount () {
    const { dispatch } = this.props
    const { mangaId, chapterId } = this.props.match.params
    dispatch(fetchMangaByIdIfNeeded(mangaId))
    dispatch(fetchChapterByIdIfNeeded(chapterId))
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  render () {
    const { showThumbnail, sliderDirection, viewMode } = this.state
    const { manga, artists, chapters, contentFilter } = this.props
    const { mangaId, chapterId, imageNumber } = this.props.match.params
    const artist = manga ? get(artists, manga.artistId) : null
    const chapter = chapters[chapterId]

    const lastSlide = this.state.showExtraSlide && manga && <ExtraSlide
      manga={manga}
      mangaId={mangaId}
      chapters={chapters}
      chapterId={chapterId} />

    return (
      <>
        <Helmet
          title={`${manga && manga.title} -
            ${chapter && chapter.number} -
            ${chapter && chapter.shortTitle} | Manga Reader`}
          meta={[
            {
              name: 'description',
              content: chapter && chapter.shortDescription
            }
          ]} />

        <ImageView>
          <header>
            <div className='breadcrumb'>
              <h1 className='truncate'>
                <Link to={toUrl('mangaDetail', { mangaId: mangaId })}>
                  {manga && manga.shortTitle} by {artist && artist.name}
                </Link>
              </h1>
              <span className='truncate'>
                {
                  chapter && manga.chaptersCount > 1 &&
                ` ${chapter.shortTitle} (${chapter.number}/${manga.chaptersCount})`
                }
              </span>
            </div>

            {/* View options */}
            <Button onClick={this.toggleSliderDirection}
              className='btn--plain'
              title='View direction'>
              {sliderDirection.toUpperCase()}
            </Button>

            <Button onClick={this.toggleThumbnailGrid}
              className='btn--plain'
              title={showThumbnail ? 'Start reading' : 'See Thumbnails'} >
              <FontAwesomeIcon icon={showThumbnail ? 'columns' : 'th'}
                size='lg' />
            </Button>

            <Button onClick={this.toggleFullScreen}
              className='btn--plain'
              title='Fullscreen mode'>
              <FontAwesomeIcon icon='expand' size='lg' />
            </Button>
          </header>

          { !contentFilter.includeNSFW && manga && manga.isNSFW
            ? <div className='nsfw-overlay'>NSFW content</div>
            : (<>
              { /* View Slider */
                viewMode === 'slider' && !showThumbnail &&
                <ImageSlider
                  chapterId={chapterId}
                  lastSlide={lastSlide}
                  onNoMoreContent={this.fetchNextChapter}
                  scrollTo={imageNumber}
                  direction={sliderDirection} />}

              { /* Thumbnail gird */
                showThumbnail &&
                <ImageGrid
                  chapterId={chapterId} mangaId={mangaId}
                  onItemClick={this.toggleThumbnailGrid}
                />}
            </>)
          }
        </ImageView>
      </>
    )
  }

  fetchNextChapter () {
    const { chapterId, mangaId } = this.props.match.params
    const { chapters } = this.props
    const { number } = chapters[chapterId] || {}

    if (mangaId && number) {
      this.props.dispatch(fetchChapterOfMangaIfNeeded(mangaId, number + 1))
    }

    // add a bit delay to avoid showing the extra slide
    // while prior slide content is rendering
    setTimeout(() => this.setState({
      showExtraSlide: true
    }), 500)
  }

  toggleFullScreen () {
    const { chapterId } = this.props.match.params
    const element = document.getElementById(`slider-images-chapter-${chapterId}`)
    return toggleFullscreen(element)
  }

  handleKeyDown (e) {
    if (document.activeElement.tagName !== 'INPUT') {
      switch (e.key) {
        case 'f':
          e.preventDefault()
          return this.toggleFullScreen()
        default:
          return null
      }
    }
  }

  toggleThumbnailGrid () {
    this.setState(prevState => ({ showThumbnail: !prevState.showThumbnail }))
  }

  toggleImageSlider () {
    this.setState({ viewMode: 'slider' })
  }

  toggleSliderDirection () {
    this.setState(prevState => {
      const direction = prevState.sliderDirection === 'rtl' ? 'ltr' : 'rtl'
      localStorage.setItem(storageKey, direction)
      return {
        sliderDirection: direction
      }
    })
  }
}

// Style
const ImageView = styled.div(props => {
  const { padding, colors } = props.theme
  return {
    minHeight: 0,
    minWidth: 0,
    display: 'flex',
    flexFlow: 'column',
    flexGrow: 1,

    header: {
      padding: `${padding / 2}px ${padding}px`,
      background: colors.surface,
      color: colors.onSurface,
      fontWeight: 600,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexFlow: 'row',

      '.breadcrumb': {
        flexBasis: 'calc(100% - 90px)',
        minWidth: 0,

        h1: {
          margin: 0,
          display: 'inline-block',
          color: colors.onSurface,
          marginRight: 10,
          fontSize: '1.2rem'
        },

        '.truncate': {
          display: 'block'
        }
      },

      a: {
        color: colors.onSurface,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      },

      'button:disabled': {
        opacity: 0.5
      }
    },

    '> div': {
      flexGrow: 1,
      minHeight: 0,
      display: 'flex',
      flexDirection: 'column',

      '.content-slider.empty': {
        flexGrow: 1,
        minHeight: 0,
        height: 'auto',

        '.slide--status': {
          margin: '0 auto'
        }
      },

      '.content-grid': {
        width: '100%'
      }
    },

    '.nsfw-overlay': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: '2rem',
      background: colors.border
    },

    'div[id^=\'grid-images-chapter-\']': {
      width: '100%',
      background: colors.background
    }
  }
})

// Connect to redux
const mapStateToProps = (state, ownProps) => {
  const { chapterId, mangaId } = ownProps.match.params
  return {
    manga: get(state, `entities.mangas[${mangaId}`),
    artists: state.entities.artists || {},
    chapters: state.entities.chapters || {},
    [`images-chapter-${chapterId}`]: state.withLoadMore[`images-chapter-${chapterId}`],
    contentFilter: state.contentFilter
  }
}

export default connect(mapStateToProps)(MangaReader)
