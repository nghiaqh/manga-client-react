import React from 'react'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import { loadMoreArtists } from 'redux/actions/artistList'
import ContentView from 'components/organisms/ContentView'

export default function ArtistList ({ searchText }) {
  if (!searchText) return null

  const filter = { name: searchText }
  const renderArtist = artist => (
    <Link
      key={artist.id}
      to={toUrl('artistDetail', { artistId: artist.id })}>
      {artist.name}
    </Link>
  )
  return (
    <div>
      <h2>Artists</h2>

      <ContentView
        id={`artists-search-${searchText}`}
        entityType='artists'
        filter={filter}
        pageSize={12}
        loadMoreFunc={loadMoreArtists}
        renderItem={renderArtist}
        layout='list'
      />
    </div>
  )
}
