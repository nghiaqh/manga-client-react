import React from 'react'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import { loadMoreChapters } from 'redux/actions/chapterList'
import ContentView from 'components/organisms/ContentView'

const renderChapter = chapter => (
  <Link
    key={chapter.id}
    to={toUrl('imageViewer', {
      mangaId: chapter.mangaId,
      chapterId: chapter.id,
      imageId: 1
    })}
  >
    {chapter.shortTitle}
  </Link>
)

export default function ChapterList ({ id, filter, pageSize }) {
  return (
    <ContentView
      id={id}
      entityType='chapters'
      filter={filter}
      pageSize={pageSize || 24}
      loadMoreFunc={loadMoreChapters}
      renderItem={renderChapter}
      layout='list'
    />
  )
}
