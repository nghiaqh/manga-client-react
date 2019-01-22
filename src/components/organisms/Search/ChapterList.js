import React from 'react'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import { loadMoreChapters } from 'redux/actions/chapterList'
import ContentView from 'components/organisms/ContentView'

export default function ChapterList ({ searchText }) {
  if (!searchText) return null

  const filter = { title: searchText, number: { gt: 0 } }
  const renderChapter = chapter => (
    <Link
      key={chapter.id}
      to={toUrl('imageViewer', {
        mangaId: chapter.mangaId,
        chapterId: chapter.id,
        imageId: 1
      })}
    >
      {chapter.shortTitle} [ch.{chapter.number}]
    </Link>
  )
  return (
    <div>
      <h2>Chapters</h2>

      <ContentView
        id={`chapters-search-${searchText}`}
        entityType='chapters'
        filter={filter}
        pageSize={12}
        loadMoreFunc={loadMoreChapters}
        renderItem={renderChapter}
        layout='list'
      />
    </div>
  )
}
