import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchMangaByIdIfNeeded } from 'redux/actions/manga'

export class MangaDetail extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchMangaByIdIfNeeded(1))
  }

  render () {
    const { mangas, artists } = this.props
    return (
      <React.Fragment>
        {mangas && mangas[1] && mangas[1].title}
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

export default connect(mapStateToProps)(MangaDetail)
