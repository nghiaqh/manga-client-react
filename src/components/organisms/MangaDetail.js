import get from 'lodash/get'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchMangaByIdIfNeeded } from 'redux/actions/manga'
import { loadMoreChapters } from 'redux/actions/chapterList'
import { toUrl } from 'libs/routes'
import ContentView from 'components/organisms/ContentView'

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
      <div>
        <div>{manga && manga.title}</div>
        <div>{artist && artist.name}</div>
        <div>{this.renderChapterList(manga)}</div>
      </div>
    )
  }

  renderChapterList (manga) {
    if (!manga || !manga.id) return
    const filter = { mangaId: manga.id }
    const renderChapter = chapter => (
      <Link
        key={chapter.id}
        to={toUrl('imageViewer', {
          mangaId: manga.id,
          chapterId: chapter.id,
          imageId: 1
        })}
      >
        {chapter.number} - {chapter.shortTitle}
      </Link>
    )
    return (
      <ContentView
        id={`manga-${manga.id}-chapters`}
        entityType='chapters'
        filter={filter}
        pageSize={24}
        loadMoreFunc={loadMoreChapters}
        renderItem={renderChapter}
        layout='list'
      />
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
