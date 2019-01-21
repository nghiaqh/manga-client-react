import styled from '@emotion/styled/macro'
import get from 'lodash/get'
import findKey from 'lodash/findKey'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import toggleFullscreen from 'libs/fullscreen'
import { fetchMangaByIdIfNeeded } from 'redux/actions/manga'
import {
  fetchChapterByIdIfNeeded,
  fetchChapterOfMangaIfNeeded
} from 'redux/actions/chapter'
import { loadMoreMangas } from 'redux/actions/mangaList'
import { loadMoreImages } from 'redux/actions/imageList'
import Button from 'components/atoms/Button'
import Image from 'components/atoms/Image'
import ContentView from 'components/organisms/ContentView'
import MangaCard from 'components/molecules/MangaCard'

class ImageViewer extends React.PureComponent {
  constructor (props) {
    super(props)
    this.toggleFullScreen = this.toggleFullScreen.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.ref = React.createRef()
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

  componentDidUpdate (prevProps) {
    const { chapterId, mangaId } = this.props.match.params
    const { chapters } = this.props
    const { number } = chapters[chapterId] || {}
    const { chaptersCount } = this.props.mangas[mangaId] || {}
    const imageList = this.props[`chapter-${chapterId}-images`] || {}
    const { total } = imageList
    const images = get(imageList, 'items', [])

    const nextChapterKey = findKey(chapters, {
      mangaId: parseInt(mangaId),
      number: number + 1
    })

    if (nextChapterKey === undefined &&
      total === images.length && number && number < chaptersCount) {
      this.props.dispatch(fetchChapterOfMangaIfNeeded(mangaId, number + 1))
      this.setState({
        shouldFetchNextChapter: false
      })
    }
  }

  render () {
    const { mangas, artists, chapters } = this.props
    const { mangaId, chapterId } = this.props.match.params

    const manga = get(mangas, mangaId)
    const artist = manga ? get(artists, manga.artistId) : null
    const chapter = chapters[chapterId]

    const endSlide = <EndSlide
      mangas={mangas}
      mangaId={mangaId}
      chapters={chapters}
      chapterId={chapterId} />

    return (
      <ImageView chapterId={chapterId} ref={this.ref}>
        <header>
          <h1>
            <Link to={toUrl('mangaDetail', { mangaId: mangaId })}>
              {manga && manga.shortTitle} by {artist && artist.name}
            </Link>
          </h1>
          <span>
            {
              chapter && chapter.number > 0 &&
              `/ ${chapter.number}. ${chapter.shortTitle}`
            }
          </span>
          <Button onClick={this.toggleFullScreen}>Toggle fullscreen [F]</Button>
        </header>
        <ImageSlider chapterId={chapterId} endSlide={endSlide} />
      </ImageView>
    )
  }

  toggleFullScreen () {
    const { chapterId } = this.props.match.params
    const element = document.getElementById(`chapter-${chapterId}-images`)
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
}

// Sub components
function ImageSlider ({ chapterId, endSlide }) {
  if (!chapterId) return
  const filter = { chapterId }
  const setImageWidth = (ref, image) => {
    const parent = document.getElementById(`chapter-${chapterId}-images`)

    if (parent && ref && image) {
      const width = image.width * (parent.offsetHeight - 25) / image.height
      ref.current.style.width = `${width > image.width ? image.width : width}px`
    }
  }

  const renderImage = image =>
    <Image
      key={image.id}
      setWidth={setImageWidth}
      {...image} />

  return (
    <ContentView
      id={`chapter-${chapterId}-images`}
      entityType='images'
      filter={filter}
      pageSize={20}
      loadMoreFunc={loadMoreImages}
      renderItem={renderImage}
      layout='slider'
      layoutDirection='rtl'
      endSlide={endSlide}
    />
  )
}

function NextChapterLink ({ mangas, mangaId, chapters, chapterId }) {
  const { number } = chapters[chapterId] || {}
  const { chaptersCount } = mangas[mangaId] || {}

  if (number && number < chaptersCount) {
    const nextChapterKey = findKey(chapters, {
      mangaId: parseInt(mangaId),
      number: number + 1
    })

    return nextChapterKey ? <NextLink
      id='next-chapter'
      to={toUrl('imageViewer', {
        mangaId: mangaId,
        chapterId: nextChapterKey,
        imageId: 1
      })}>
      Next chapter ({chapters[nextChapterKey].number}) <br />
      {chapters[nextChapterKey].shortTitle}
    </NextLink> : null
  }

  return null
}

function SameAuthorMangaList ({ manga }) {
  if (!manga || !manga.artistId) return null

  const filter = {
    artistId: manga.artistId,
    id: {
      neq: manga.id
    }
  }
  const renderMangaCard = manga => (
    <MangaCard key={manga.id} manga={manga} size={{
      height: 150,
      width: 90
    }} />
  )

  return (
    <>
      <h2>Same Author</h2>
      <ContentView
        id={`mangas-by-artist-${manga.artistId}`}
        entityType='mangas'
        filter={filter}
        pageSize={9}
        loadMoreFunc={loadMoreMangas}
        renderItem={renderMangaCard}
        layout='grid'
        colWidth={80}
      />
    </>
  )
}

function EndSlide ({ mangas, mangaId, chapters, chapterId }) {
  const manga = mangas[mangaId]

  return (
    <LastSlide>
      <div><SameAuthorMangaList manga={manga} /></div>
      <NextChapterLink
        mangas={mangas}
        mangaId={mangaId}
        chapters={chapters}
        chapterId={chapterId} />
    </LastSlide>
  )
}

// Style
const ImageView = styled.div(props => {
  const mainId = `chapter-${props.chapterId}-images`
  const { padding, colors } = props.theme
  return {
    display: 'flex',
    flexFlow: 'column',
    flexGrow: 1,

    header: {
      padding: `${padding / 2}px ${padding}px`,
      background: colors.surface,
      color: colors.onSurface,
      fontWeight: 600,

      h1: {
        margin: 0,
        display: 'inline-block',
        color: colors.onSurface,
        marginRight: 10,
        fontSize: '1.2rem'
      },

      span: {

      },

      button: {
        float: 'right'
      },

      a: {
        color: colors.onSurface,
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline'
        }
      }
    },

    [`#${mainId}`]: {
      flexGrow: 1,
      minHeight: 0
    }
  }
})

const NextLink = styled(Link)(props => ({
  color: props.theme.colors.onSurface,
  textDecoration: 'none',
  fontWeight: 600,
  fontSize: '0.8em',
  direction: 'ltr',

  '&:hover': {
    textDecoration: 'underline'
  }
}))

const LastSlide = styled.div(props => ({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'space-evenly',
  height: '100%',

  '& > div': {
    minWidth: 400,
    maxWidth: '100%'
  },

  '.not-found-msg': {
    margin: '0 auto'
  }
}))

// Connect to redux
const mapStateToProps = (state, ownProps) => {
  const { chapterId } = ownProps.match.params
  return {
    mangas: state.entities.mangas || {},
    artists: state.entities.artists || {},
    chapters: state.entities.chapters || {},
    [`chapter-${chapterId}-images`]: state.withLoadMore[`chapter-${chapterId}-images`]
  }
}

export default connect(mapStateToProps)(ImageViewer)
