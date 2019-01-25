import get from 'lodash/get'
import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled/macro'
import { fetchMangaByIdIfNeeded } from 'redux/actions/manga'
import Image from 'components/atoms/Image'
import ChapterList from 'components/organisms/ChapterList'
import MangaSlider from 'components/organisms/MangaSlider'

class MangaDetail extends React.PureComponent {
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
        <Helmet>
          <title>
            {`${manga && manga.title} | Manga Reader`}
          </title>
          <meta name='description'
            content={manga && manga.shortDescription} />
        </Helmet>

        <header>
          <div className='media'
            onMouseOver={this.handleMouseOverMedia}
            onMouseOut={this.handleMouseOverMedia} >
            {previewImages.map(img => <Image key={img.id} {...img} />)}
          </div>
        </header>

        <div className='zone-container'>
          <h1 className='title'>{manga && manga.shortTitle}</h1>
          <strong className='artist'>{artist && artist.name}</strong>

          <div className='meta'>{manga.description}</div>

          <div className='meta'>
            <div>
              <span className='meta__label'>Status:</span> {status}
            </div>
            <div>
              <span className='meta__label'>Released:</span> {publishedDate}
            </div>
            <div>
              <span className='meta__label'>Chapters:</span> {manga.chaptersCount}
            </div>
            { manga.tags &&
              <div>
                <span className='meta__label'>Tags</span>
                {manga.tags.map(tag => <span key={tag}>{tag} </span>)}
              </div>
            }
            <div>
              <span className='meta__label'>{manga.isNSFW && 'NSFW'}</span>
            </div>
          </div>
        </div>

        { manga && manga.id &&
          <div className='zone-container'>
            <h2>Chapters</h2>
            <ChapterList id={`chapters-manga-${manga.id}`}
              filter={{ mangaId: manga.id }} />
          </div>
        }

        { manga && manga.artistId &&
          <div className='zone-container'>
            <h2>From same author</h2>
            <MangaSlider id={`mangas-artist-${manga.artistId}-neq-${manga.id}`}
              filter={{
                artistId: manga.artistId,
                id: {
                  neq: manga.id
                }
              }} />
          </div>
        }
      </Container>
    )
  }

  handleMouseOverMedia (event) {
    const images = event.currentTarget.querySelectorAll('img')
    images.forEach(img => {
      const op = img.style.objectPosition
      img.style.objectPosition = (!op || op === 'center top')
        ? 'center bottom' : 'center top'
    })
  }
}

const Container = styled.div(props => {
  const { colors, padding } = props.theme

  return {
    'header': {
      '.media': {
        height: '35vh',
        display: 'flex',
        overflowX: 'auto',
        img: {
          objectFit: 'cover',
          objectPosition: 'center top'
        },
        borderBottom: `1px solid ${colors.border}`
      }
    },

    '.meta': {
      marginTop: padding,
      fontSize: '1em',

      '.meta__label': {
        fontWeight: 600
      }
    },

    '.zone-container': {
      maxWidth: 1200,
      margin: '0 auto',
      padding
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
