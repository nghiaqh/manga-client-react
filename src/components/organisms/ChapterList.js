import React from 'react'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import { loadMoreChapters } from 'redux/actions/chapterList'
import ContentView from 'components/organisms/ContentView'

function renderChapter (chapter) {
  return (
    <Link
      key={chapter.id}
      to={toUrl('mangaReader', {
        mangaId: chapter.mangaId,
        chapterId: chapter.id,
        imageNumber: 1
      })}
    >
      {chapter.shortTitle}
    </Link>
  )
}

function renderFullTitleChapter (chapter) {
  return (
    <Link
      key={chapter.id}
      to={toUrl('mangaReader', {
        mangaId: chapter.mangaId,
        chapterId: chapter.id,
        imageNumber: 1
      })}
    >
      {chapter.title}
    </Link>
  )
}

function renderChapterListWith (renderItem) {
  return ({ id, filter, pageSize, children }) => (
    <ContentView
      id={id}
      entityType='chapters'
      filter={filter}
      pageSize={pageSize || 24}
      loadMoreFunc={loadMoreChapters}
      renderItem={renderItem}
      layout='list'
    >
      {children}
    </ContentView>
  )
}

const ChapterList = renderChapterListWith(renderChapter)

export default ChapterList
export const FullTitleChapterList = renderChapterListWith(renderFullTitleChapter)
