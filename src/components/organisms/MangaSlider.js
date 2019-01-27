import React from 'react'
import { loadMoreMangas } from 'redux/actions/mangaList'
import ContentView from 'components/organisms/ContentView'
import MangaCard from 'components/molecules/MangaCard'

export default function MangaSlider ({ id, filter, pageSize, cardSize, children }) {
  const size = cardSize || {
    height: 280,
    width: 180
  }

  const renderMangaCard = manga => (
    <MangaCard key={manga.id} manga={manga} size={size} />
  )

  return (
    <ContentView
      id={id}
      entityType='mangas'
      filter={filter}
      pageSize={pageSize || 24}
      loadMoreFunc={loadMoreMangas}
      renderItem={renderMangaCard}
      layout='slider'
    >
      {children}
    </ContentView>
  )
}
