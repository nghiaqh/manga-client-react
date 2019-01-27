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
      onNoMoreContent
    } = this.props

    if (!chapterId) return
    const contentViewId = `images-chapter-${chapterId}`
    const filter = { chapterId }
    const setImageWidth = (ref, image) => {
      const parent = document.getElementById('slider-' + contentViewId)

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
        id={contentViewId}
        entityType='images'
        filter={filter}
        pageSize={20}
        loadMoreFunc={loadMoreImages}
        renderItem={renderImage}
        layout='slider'
        layoutDirection='rtl'
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
      this.scrollToItem({
        inline: 'end'
      })
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
