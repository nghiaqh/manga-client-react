import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchArtistByIdIfNeeded } from 'redux/actions/artistActions'

export class ArtistDetail extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchArtistByIdIfNeeded(28))
  }

  render () {
    const { mangas, artists } = this.props
    return (
      <React.Fragment>
        {artists && artists[28] && artists[28].name}
      </React.Fragment>
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
