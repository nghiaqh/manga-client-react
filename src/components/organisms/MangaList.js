import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loadMoreMangas } from 'redux/actions/mangaList'

export class MangaDetail extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(loadMoreMangas('manga-hub'))
  }

  render () {
    const { mangas, artists, withLoadMore } = this.props
    return (
      <React.Fragment>
        {withLoadMore['manga-hub'] && withLoadMore['manga-hub'].items}
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas || {},
    artists: state.entities.artists || {},
    withLoadMore: state.withLoadMore
  }
}

export default connect(mapStateToProps)(MangaDetail)
