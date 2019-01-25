import findKey from 'lodash/findKey'
import styled from '@emotion/styled/macro'
import React from 'react'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import MangaGrid from 'components/organisms/MangaGrid'

function NextChapterLink ({ mangas, mangaId, chapters, chapterId }) {
  const { number } = chapters[chapterId] || {}
  const { chaptersCount } = mangas[mangaId] || {}

  if (number && number < chaptersCount) {
    const nextChapterKey = findKey(chapters, {
      mangaId: parseInt(mangaId),
      number: number + 1
    })

    return nextChapterKey
      ? <Link
        id='to-next-chapter'
        to={toUrl('imageViewer', {
          mangaId: mangaId,
          chapterId: nextChapterKey,
          imageId: 1
        })}>
        Next chapter ({chapters[nextChapterKey].number}) <br />
        {chapters[nextChapterKey].shortTitle}
      </Link> : null
  }

  return null
}

export default function ExtraSlide ({ mangas, mangaId, chapters, chapterId }) {
  const manga = mangas[mangaId]
  const filter = {
    artistId: manga.artistId,
    id: {
      neq: manga.id
    }
  }
  const { number } = chapters[chapterId]

  return (
    <Container>
      <i>
        { manga.chaptersCount === number && 'End of last chapter' }
        { !number && 'End of manga' }
      </i>

      <div>
        <h2>You might like</h2>
        <MangaGrid
          id={`mangas-artist-${manga.artistId}-neq-${manga.id}`}
          filter={filter}
          pageSize={6}
          cardSize={{ height: 150, width: 90 }}
          hideLoadMoreBtn />
      </div>
      <NextChapterLink
        mangas={mangas}
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

    '& > div': {
      width: `calc(100vw - ${padding * 2}px)`,
      paddingRight: padding,

      '.content-grid': {
        maxWidth: 700,
        margin: '0 auto'
      }
    },

    '.not-found-msg': {
      margin: '0 auto'
    },

    '#to-next-chapter': {
      color: colors.onSurface,
      textDecoration: 'none',
      fontWeight: 600,
      fontSize: '0.8em',
      direction: 'ltr',

      '&:hover': {
        textDecoration: 'underline'
      }
    }
  }
})
