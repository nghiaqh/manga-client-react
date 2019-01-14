import styled from '@emotion/styled/macro'
import get from 'lodash/get'
import React from 'react'
import { connect } from 'react-redux'
import { fetchMangaByIdIfNeeded } from 'redux/actions/manga'
import { loadMoreImages } from 'redux/actions/imageList'
import Image from 'components/atoms/Image'
import ContentView from 'components/organisms/ContentView'

class ImageViewer extends React.PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchMangaByIdIfNeeded(this.props.match.params.mangaId))
    const imageSlider = document.querySelector('.slider')
    imageSlider.addEventListener('wheel', this.handleMouseWheel)
  }

  render () {
    const { match, mangas, artists } = this.props
    const mangaId = parseInt(match.params.mangaId)
    const manga = get(mangas, mangaId)
    const artist = manga ? get(artists, manga.artistId) : null

    return (
      <ImageView>
        <div>{manga && manga.title}</div>
        <div>{artist && artist.name}</div>
        {this.renderImageSlider(match.params.chapterId, match.params.imageId)}
      </ImageView>
    )
  }

  renderImageSlider (chapterId, imageNumber) {
    if (!chapterId) return
    const filter = { chapterId: chapterId, number: imageNumber }
    const setImageWidth = this.setImageWidth
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

  handleMouseWheel (event) {
    // Firefox deltaMode = 1 means scroll 1 line
    // Multiply by 30 for faster horizontal scroll
    event.target.offsetParent.scrollLeft -= event.deltaMode === 1 ? event.deltaY * 30 : event.deltaY
  }

  setImageWidth (ref, image) {
    const width = image.width * window.innerHeight / image.height
    ref.current.style.width = `${width}px`
  }
}

const ImageView = styled.section(props => {
  return {
    '.slider': {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      direction: 'rtl'
    }
  }
})

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas || {},
    artists: state.entities.artists || {}
  }
}

export default connect(mapStateToProps)(ImageViewer)
