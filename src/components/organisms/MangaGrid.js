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
  hideLoadMoreBtn,
  children,
  order,
  noTags,
  maxItems,
  colWidth
}) {
  const renderMangaCard = manga => (
    <MangaCard key={manga.id} manga={manga} size={cardSize} noTags={noTags} />
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
      colWidth={colWidth || (cardSize && cardSize.width)}
      hideLoadMoreBtn={hideLoadMoreBtn}
      order={order}
      maxItems={maxItems}
    >
      {children}
    </ContentView>
  )
}
