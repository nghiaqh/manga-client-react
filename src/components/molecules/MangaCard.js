/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from 'components/molecules/Card'
import { toUrl } from 'libs/routes'

class MangaCard extends React.PureComponent {
  render () {
    const { manga, artists, classNames } = this.props
    const artist = artists[manga.artistId] || {}

    const { id, title } = manga
    const mangaUrl = toUrl('mangaDetail', { mangaId: id })

    return (
      <Link className={`card--manga ${classNames}`} to={mangaUrl}
        css={anchorOnSurfaceCss}>
        <Card
          title={title}
          description={artist.name}
        />
      </Link>
    )
  }
}

const anchorOnSurfaceCss = theme => ({
  textDecoration: 'none',
  color: theme.colors.onSurface
})

const mapStateToProps = (state) => {
  return {
    style: state.style,
    artists: state.entities.artists || {}
  }
}

export default connect(mapStateToProps)(MangaCard)
