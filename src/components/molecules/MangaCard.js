import styled from '@emotion/styled/macro'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import Card from 'components/molecules/Card'
import Image from 'components/atoms/Image'

class MangaCard extends React.PureComponent {
  render () {
    const { manga, artists, classNames, onItemClick, size, noTags } = this.props
    const artist = artists[manga.artistId] || {}

    const { id, shortTitle, isSeries, isTankoubou, isDoujinshi, isNSFW } = manga
    const mangaUrl = toUrl('mangaDetail', { mangaId: id })
    const thumbnail = <Image {...manga.previewImages[0]} />
    const releasedDate = manga.latestPublishedAt
      ? new Date(manga.latestPublishedAt).toLocaleDateString(
        'en-US',
        { year: 'numeric', month: 'numeric' }
      )
      : ''

    const tags = [ releasedDate ]
    if (isSeries) tags.push('series')
    if (isTankoubou) tags.push('tank')
    if (isDoujinshi) tags.push('douji')
    if (isNSFW) tags.push('nsfw')

    return (
      <Container
        to={mangaUrl}
        className={`card--manga ${classNames || ''}`}
        onClick={onItemClick}
        data-key={id}>
        <Card
          media={thumbnail}
          title={shortTitle}
          description={artist.name}
          size={size}
        >
          {!noTags && <div className='tags'>
            {tags.join(', ')}
          </div>}
        </Card>
      </Container>
    )
  }
}

const Container = styled(Link)(props => {
  const { colors, padding, borderRadius } = props.theme

  return {
    textDecoration: 'none',
    '.tags': {
      borderTop: `1px dashed ${colors.border}`,
      borderRadius: `0 0 ${borderRadius}px ${borderRadius}px`,
      display: 'flex',
      alignItems: 'center',
      marginTop: padding / 2,
      padding: padding / 3,
      fontSize: '0.75em'
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style,
    artists: state.entities.artists || {}
  }
}

export default connect(mapStateToProps)(MangaCard)
