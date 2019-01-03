import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loadMoreMangas } from 'redux/actions/mangaList'

export class MangaDetail extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(loadMoreMangas('manga-hub'))
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
