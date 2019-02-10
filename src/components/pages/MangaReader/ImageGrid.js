import React from 'react'
import { loadMoreImages } from 'redux/actions/imageList'
import { toUrl } from 'libs/routes'
import { Link } from 'react-router-dom'
import ContentView from 'components/organisms/ContentView'
import ProgressiveImage from 'components/atoms/ProgressiveImage'
import Card from 'components/molecules/Card'

export default function ImageGrid ({ chapterId, mangaId, onItemClick }) {
  if (!chapterId) return
  const contentViewId = `images-chapter-${chapterId}`
  const filter = { chapterId }
  const renderImage = image =>
    <Link
      to={toUrl('mangaReader', {
        mangaId: mangaId,
        chapterId,
        imageNumber: image.number
      })}
      onClick={onItemClick} >
      <Card
        media={<ProgressiveImage key={image.id} {...image} />}
        description={image.number}
        size={{
          height: '200px',
          width: '140px'
        }}
      />
    </Link>

  return (
    <ContentView
      id={contentViewId}
      entityType='images'
      filter={filter}
      pageSize={20}
      loadMoreFunc={loadMoreImages}
      renderItem={renderImage}
      layout='grid'
      colWidth={140}
    />
  )
}
