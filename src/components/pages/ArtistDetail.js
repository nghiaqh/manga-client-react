import get from 'lodash/get'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchArtistByIdIfNeeded } from 'redux/actions/artist'

class ArtistDetail extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchArtistByIdIfNeeded(this.props.match.params.artistId))
  }

  render () {
    const { match, artists } = this.props
    const artistId = parseInt(match.params.artistId)
    const artist = get(artists, artistId)

    return (
      <React.Fragment>
        {artist && <h1>artist.name</h1>}
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

export default connect(mapStateToProps)(ArtistDetail)
