import findKey from 'lodash/findKey'
import styled from '@emotion/styled/macro'
import React from 'react'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import MangaSlider from 'components/organisms/MangaSlider'

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
    artistId: manga.artistId
  }

  return (
    <Container>
      <div>
        <h2>You might like</h2>
        <MangaSlider
          id={`mangas-suggestion-${mangaId}`}
          filter={filter}
          pageSize={6}
          cardSize={{ height: 200, width: 150 }} />
      </div>
      <NextChapterLink
        mangas={mangas}
        mangaId={mangaId}
        chapters={chapters}
        chapterId={chapterId} />
    </Container>
  )
}

const Container = styled.div(props => ({
  display: 'flex',
  flexFlow: 'column',
  justifyContent: 'space-evenly',
  height: '100%',

  '& > div': {
    minWidth: 400,
    maxWidth: '100%'
  },

  '.not-found-msg': {
    margin: '0 auto'
  },

  '#to-next-chapter': {
    color: props.theme.colors.onSurface,
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '0.8em',
    direction: 'ltr',

    '&:hover': {
      textDecoration: 'underline'
    }
  }
}))
