import React from 'react'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import { loadMoreArtists } from 'redux/actions/artistList'
import ContentView from 'components/organisms/ContentView'

const renderArtist = artist => (
  <Link
    key={artist.id}
    to={toUrl('artistDetail', { artistId: artist.id })}>
    {artist.name}
  </Link>
)

export default function ArtistList ({ id, filter, pageSize }) {
  return (
    <ContentView
      id={id}
      entityType='artists'
      filter={filter}
      pageSize={pageSize || 24}
      loadMoreFunc={loadMoreArtists}
      renderItem={renderArtist}
      layout='list'
    />
  )
}
