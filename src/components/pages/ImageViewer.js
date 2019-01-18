import styled from '@emotion/styled/macro'
import get from 'lodash/get'
import findKey from 'lodash/findKey'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import { fetchMangaByIdIfNeeded } from 'redux/actions/manga'
import {
  fetchChapterByIdIfNeeded,
  fetchChapterOfMangaIfNeeded
} from 'redux/actions/chapter'
import { loadMoreImages } from 'redux/actions/imageList'
import Image from 'components/atoms/Image'
import ContentView from 'components/organisms/ContentView'

class ImageViewer extends React.PureComponent {
  componentWillMount () {
    const { dispatch } = this.props
    const { mangaId, chapterId } = this.props.match.params
    dispatch(fetchMangaByIdIfNeeded(mangaId))
    dispatch(fetchChapterByIdIfNeeded(chapterId))
  }

  componentDidMount () {
    const { chapterId } = this.props.match.params
    const slider = document.querySelector(`#chapter-${chapterId}-images .slider`)
    if (slider) {
      slider.addEventListener('wheel', this.handleMouseWheel)
    }
  }

  componentDidUpdate (prevProps) {
    const { chapterId, mangaId } = this.props.match.params
    const { number } = this.props.chapters[chapterId] || {}
    const { chaptersCount } = this.props.mangas[mangaId] || {}
    const imageList = this.props[`chapter-${chapterId}-images`] || {}
    const { total } = imageList
    const images = get(imageList, 'items', [])

    if (total === images.length && number && number < chaptersCount) {
      this.props.dispatch(fetchChapterOfMangaIfNeeded(mangaId, number + 1))
    }
  }

  render () {
    const { mangas, artists, chapters } = this.props
    const { mangaId, chapterId } = this.props.match.params

    const manga = get(mangas, mangaId)
    const artist = manga ? get(artists, manga.artistId) : null

    return (
      <ImageView>
        <div>{manga && manga.title}</div>
        <div>{artist && artist.name}</div>
        <div>{Object.keys(this.props.chapters).map(k => k)}</div>
        <ImageSlider chapterId={chapterId} />
        <NextChapterLink
          mangas={mangas}
          mangaId={mangaId}
          chapters={chapters}
          chapterId={chapterId} />
      </ImageView>
    )
  }

  handleMouseWheel (event) {
    // Firefox deltaMode = 1 means scroll 1 line
    // Multiply by 30 for faster horizontal scroll
    const slider = event.target.offsetParent
    if (slider) slider.scrollLeft -= event.deltaMode === 1 ? event.deltaY * 30 : event.deltaY
  }
}

// Sub components
function ImageSlider ({ chapterId }) {
  if (!chapterId) return
  const filter = { chapterId }

  const setImageWidth = (ref, image) => {
    const width = image.width * window.innerHeight / image.height
    ref.current.style.width = `${width}px`
  }

  const renderImage = image =>
    <Image
      key={image.id}
      handleOnLoad={setImageWidth}
      {...image} />

  return (
    <ContentView
      id={`chapter-${chapterId}-images`}
      entityType='images'
      filter={filter}
      pageSize={6}
      loadMoreFunc={loadMoreImages}
      renderItem={renderImage}
      layout='slider'
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

    return nextChapterKey ? <StyledLink
      id='next-chapter'
      to={toUrl('imageViewer', {
        mangaId: mangaId,
        chapterId: nextChapterKey,
        imageId: 1
      })}> Next Chapter </StyledLink> : null
  }

  return null
}

// Style
const ImageView = styled.section(props => {
  return {
    '.slider': {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      direction: 'rtl',

      '.slide:first-of-type': {
        paddingRight: props.theme.padding
      },

      '.slide:last-child': {
        paddingLeft: props.theme.padding
      }
    }
  }
})

const StyledLink = styled(Link)(props => {
  return {
    position: 'absolute',
    bottom: 45,
    zIndex: 1,
    background: props.theme.colors.surface,
    color: props.theme.colors.onSurface
  }
})

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
