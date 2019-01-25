import React from 'react'
import { loadMoreMangas } from 'redux/actions/mangaList'
import ContentView from 'components/organisms/ContentView'
import MangaCard from 'components/molecules/MangaCard'

export default function MangaGrid ({
  id,
  filter,
  pageSize,
  cardSize,
  layout,
  hideLoadMoreBtn
}) {
  const renderMangaCard = manga => (
    <MangaCard key={manga.id} manga={manga} size={cardSize} />
  )

  return (
    <ContentView
      id={id}
      entityType='mangas'
      filter={filter}
      pageSize={pageSize || 24}
      loadMoreFunc={loadMoreMangas}
      renderItem={renderMangaCard}
      layout={layout || 'grid'}
      colWidth={cardSize && cardSize.width}
      hideLoadMoreBtn={hideLoadMoreBtn}
    />
  )
}
