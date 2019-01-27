import React from 'react'
import { loadMoreImages } from 'redux/actions/imageList'
import ContentView from 'components/organisms/ContentView'
import Image from 'components/atoms/Image'
import Card from 'components/molecules/Card'

export default function ImageSlider ({ chapterId }) {
  if (!chapterId) return
  const contentViewId = `images-chapter-${chapterId}`
  const filter = { chapterId }

  const renderImage = image =>
    <Card
      media={<Image key={image.id} {...image} />}
      description={image.number}
      size={{
        height: '240px',
        width: '200px'
      }}
    />

  return (
    <ContentView
      id={contentViewId}
      entityType='images'
      filter={filter}
      pageSize={20}
      loadMoreFunc={loadMoreImages}
      renderItem={renderImage}
      layout='grid'
      colWidth={200}
    />
  )
}
