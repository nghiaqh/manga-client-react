import React from 'react'
import { loadMoreImages } from 'redux/actions/imageList'
import ContentView from 'components/organisms/ContentView'
import Image from 'components/atoms/Image'

export default class ImageSlider extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      scrollTo: props.scrollTo
    }

    this.scrollToItem = this.scrollToItem.bind(this)
  }

  render () {
    const {
      chapterId,
      lastSlide,
      onNoMoreContent,
      direction
    } = this.props

    if (!chapterId) return
    const contentViewId = `images-chapter-${chapterId}`
    const filter = { chapterId }
    const setImageWidth = (elRef, image) => {
      const parent = document.getElementById('slider-' + contentViewId)
      const wH = window.innerHeight
      const height = parent.offsetHeight <= wH ? parent.offsetHeight : wH

      if (parent && elRef && image) {
        const width = image.width * (height - 25) / image.height
        elRef.current.style.width =
          `${width > image.width ? image.width : width}px`
      }
    }

    const renderImage = image =>
      <Image
        key={image.id}
        setWidth={setImageWidth}
        {...image} />

    return (
      <ContentView
        id={contentViewId}
        entityType='images'
        filter={filter}
        pageSize={20}
        loadMoreFunc={loadMoreImages}
        renderItem={renderImage}
        layout='slider'
        layoutDirection={direction}
        lastSlide={lastSlide}
        onNoMoreContent={onNoMoreContent}
      />
    )
  }

  componentDidMount () {
    this.scrollToItem()
  }

  componentDidUpdate (prevProps) {
    if (prevProps.scrollTo !== this.props.scrollTo) {
      this.scrollToItem()
    }
  }

  scrollToItem () {
    const { chapterId, scrollTo } = this.props
    if (!chapterId || !scrollTo) return

    const slider = document.getElementById(`slider-images-chapter-${chapterId}`)
    const slides = slider ? slider.getElementsByClassName('slide') : []
    const slide = slides[scrollTo - 1]
    if (slide) {
      slide.scrollIntoView()
    }
  }
}
