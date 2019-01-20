import get from 'lodash/get'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled/macro'
import { fetchMangaByIdIfNeeded } from 'redux/actions/manga'
import { loadMoreChapters } from 'redux/actions/chapterList'
import { loadMoreMangas } from 'redux/actions/mangaList'
import { toUrl } from 'libs/routes'
import ContentView from 'components/organisms/ContentView'
import MangaCard from 'components/molecules/MangaCard'
import Image from 'components/atoms/Image'

class MangaDetail extends PureComponent {
  componentDidMount () {
    const { dispatch } = this.props
    dispatch(fetchMangaByIdIfNeeded(this.props.match.params.mangaId))
  }

  render () {
    const { match, mangas, artists } = this.props
    const mangaId = parseInt(match.params.mangaId)
    const manga = get(mangas, mangaId, {})
    const artist = manga ? get(artists, manga.artistId) : null
    const previewImages = get(manga, 'previewImages', [])
    const status = manga.isComplete ? 'Complete' : 'On going'
    const publishedDate = manga.publishedAt
      ? new Date(manga.publishedAt).toLocaleDateString() : ''

    return (
      <Container>
        <header>
          <div className='media'>
            {previewImages.map(img => <Image key={img.id} {...img} />)}
          </div>
          <h1 className='title'>{manga && manga.title}</h1>
          <strong className='artist'>{artist && artist.name}</strong>
          <div className='meta'>
            <div>
              <span className='meta__label'>Status:</span> {status}
            </div>
            <div>
              <span className='meta__label'>Released:</span> {publishedDate}
            </div>
          </div>
        </header>
        <div><ChapterList manga={manga} /></div>
        <div><SameAuthorMangaList manga={manga} /></div>
      </Container>
    )
  }
}

function ChapterList ({ manga }) {
  if (!manga || !manga.id) return null

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
    <>
      <h2>Chapters</h2>

      <ContentView
        id={`manga-${manga.id}-chapters`}
        entityType='chapters'
        filter={filter}
        pageSize={24}
        loadMoreFunc={loadMoreChapters}
        renderItem={renderChapter}
        layout='list'
      />
    </>
  )
}

function SameAuthorMangaList ({ manga }) {
  if (!manga || !manga.artistId) return null

  const filter = {
    artistId: manga.artistId
  }
  const renderMangaCard = manga => (
    <MangaCard key={manga.id} manga={manga} size={{
      height: 240,
      width: 180
    }} />
  )

  return (
    <>
      <h2>Same Author</h2>
      <ContentView
        id={`mangas-by-artist-${manga.artistId}`}
        entityType='mangas'
        filter={filter}
        pageSize={24}
        loadMoreFunc={loadMoreMangas}
        renderItem={renderMangaCard}
        layout='slider'
      />
    </>
  )
}

const Container = styled.div(props => {
  const { colors, padding } = props.theme

  return {
    padding: padding,

    'header': {
      '.media': {
        height: 300,
        display: 'flex',
        overflowX: 'auto',
        img: {
          objectFit: 'cover',
          objectPosition: 'top'
        }
      },
      '.title': {
        marginBottom: 0
      },
      '.meta': {
        marginTop: padding / 2,
        fontSize: '0.8em'
      }
    },

    '.content-list': {
      marginTop: padding
    },

    a: {
      color: colors.onBackground
    }
  }
})

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas || {},
    artists: state.entities.artists || {}
  }
}

export default connect(mapStateToProps)(MangaDetail)
