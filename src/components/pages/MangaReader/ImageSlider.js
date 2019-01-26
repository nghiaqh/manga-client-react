import React from 'react'
import { loadMoreImages } from 'redux/actions/imageList'
import ContentView from 'components/organisms/ContentView'
import Image from 'components/atoms/Image'

export default function ImageSlider ({
  chapterId,
  lastSlide,
  onNoMoreContent
}) {
  if (!chapterId) return
  const contentViewId = `images-chapter-${chapterId}`
  const filter = { chapterId }
  const setImageWidth = (ref, image) => {
    const parent = document.getElementById(contentViewId)

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
