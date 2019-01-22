import React from 'react'
import { loadMoreMangas } from 'redux/actions/mangaList'
import ContentView from 'components/organisms/ContentView'
import MangaCard from 'components/molecules/MangaCard'

export default function MangaSlider ({ searchText }) {
  if (!searchText) return null

  const filter = { title: searchText }
  const renderMangaCard = manga => (
    <MangaCard key={manga.id} manga={manga} size={{
      height: 280,
      width: 180
    }} />
  )
  return (
    <div>
      <h2>Mangas</h2>

      <ContentView
        id={`mangas-search-${searchText}`}
        entityType='mangas'
        filter={filter}
        pageSize={12}
        loadMoreFunc={loadMoreMangas}
        renderItem={renderMangaCard}
        layout='slider'
      />
    </div>
  )
}
