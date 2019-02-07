import findKey from 'lodash/findKey'
import styled from '@emotion/styled/macro'
import React from 'react'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import MangaGrid from 'components/organisms/MangaGrid'

function NextChapterLink ({ manga, mangaId, chapters, chapterId }) {
  const { number } = chapters[chapterId] || {}
  const { chaptersCount } = manga

  if (number < chaptersCount && chaptersCount > 1) {
    const nextChapterKey = findKey(chapters, {
      mangaId: parseInt(mangaId),
      number: number + 1
    })

    return nextChapterKey
      ? <Link
        id='to-next-chapter'
        to={toUrl('mangaReader', {
          mangaId: mangaId,
          chapterId: nextChapterKey,
          imageNumber: 1
        })}>
        Next chapter - {chapters[nextChapterKey].shortTitle}
      </Link> : null
  }

  return null
}

export default function ExtraSlide ({ manga, mangaId, chapters, chapterId }) {
  const filter = {
    artistId: manga.artistId,
    id: {
      neq: manga.id
    }
  }
  const { number, shortTitle } = chapters[chapterId]

  return (
    <Container>
      <i>
        { manga.chaptersCount !== number && `End of ${shortTitle}` }
        { (manga.chaptersCount === number) && `End of ${manga.shortTitle}` }
      </i>

      <div>
        <MangaGrid
          id={`mangas-artist-${manga.artistId}-neq-${manga.id}`}
          filter={filter}
          pageSize={8}
          maxItems={8}
          cardSize={{ height: 150, width: 90 }}
          hideLoadMoreBtn
          noTags>
          <h2>You might like</h2>
        </MangaGrid>
      </div>
      <NextChapterLink
        manga={manga}
        mangaId={mangaId}
        chapters={chapters}
        chapterId={chapterId} />
    </Container>
  )
}

const Container = styled.div(props => {
  const { colors, padding } = props.theme
  return {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-evenly',
    height: '100%',
    direction: 'ltr',

    '& > div': {
      width: `calc(100vw - ${padding * 2}px)`,
      maxWidth: 960,
      paddingRight: padding,

      '.content-grid': {
        maxWidth: 500,
        margin: '0 auto',

        '&.empty': {
          display: 'none'
        },

        '.not-found-msg': {
          margin: '0 auto'
        },

        '& .card__description': {
          display: 'none'
        }
      }
    },

    '#to-next-chapter': {
      color: colors.onSurface,
      textDecoration: 'none',
      fontWeight: 600,

      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
})
