import React from 'react'
import { loadMoreMangas } from 'redux/actions/mangaList'
import ContentView from 'components/organisms/ContentView'
import MangaCard from 'components/molecules/MangaCard'

const renderMangaCard = manga => (
  <MangaCard key={manga.id} manga={manga} size={{
    height: 280,
    width: 180
  }} />
)

export default function SameAuthorMangaSlider ({ id, filter, pageSize }) {
  return (
    <ContentView
      id={id}
      entityType='mangas'
      filter={filter}
      pageSize={pageSize || 24}
      loadMoreFunc={loadMoreMangas}
      renderItem={renderMangaCard}
      layout='slider'
    />
  )
}
