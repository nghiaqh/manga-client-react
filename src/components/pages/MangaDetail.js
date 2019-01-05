import get from 'lodash/get'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchMangaByIdIfNeeded } from 'redux/actions/manga'

class MangaDetail extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchMangaByIdIfNeeded(this.props.match.params.mangaId))
  }

  render () {
    const { match, mangas, artists } = this.props
    const mangaId = parseInt(match.params.mangaId)
    const manga = get(mangas, mangaId)
    const artist = manga ? get(artists, manga.artistId) : null

    return (
      <React.Fragment>
        {manga && manga.title}<br />
        {artist && artist.name}
      </React.Fragment >
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas || {},
    artists: state.entities.artists || {}
  }
}

export default connect(mapStateToProps)(MangaDetail)
