import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Card from 'components/molecules/Card'
import { toUrl } from 'libs/routes'

class MangaCard extends PureComponent {
  render () {
    const { manga, artists } = this.props
    const artist = artists[manga.artistId] || {}

    const { id, title } = manga
    const mangaUrl = toUrl('mangas', { mangaId: id })

    return (
      <Link className='card--manga' to={mangaUrl}>
        <Card
          title={title}
          description={artist.name}
        />
      </Link>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    style: state.style,
    artists: state.entities.artists || {}
  }
}

export default connect(mapStateToProps)(MangaCard)
