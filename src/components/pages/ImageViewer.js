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

    const endSlide = <NextChapterLink
      mangas={mangas}
      mangaId={mangaId}
      chapters={chapters}
      chapterId={chapterId} />

    return (
      <ImageView>
        <div>
          <StyledLink to={toUrl('mangaDetail', { mangaId: mangaId })}>
            {manga && manga.title} - {artist && artist.name}
          </StyledLink>
        </div>
        <ImageSlider chapterId={chapterId} endSlide={endSlide} />
      </ImageView>
    )
  }
}

// Sub components
function ImageSlider ({ chapterId, endSlide }) {
  if (!chapterId) return
  const filter = { chapterId }

  const setImageWidth = (ref, image) => {
    const width = image.width * (window.innerHeight - 200) / image.height
    ref.current.style.width = `${width > image.width ? image.width : width}px`
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
      pageSize={6}
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
const ImageView = styled.div(props => {
  return {
  }
})

const StyledLink = styled(Link)(props => {
  return {
    color: props.theme.colors.onBackground
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
