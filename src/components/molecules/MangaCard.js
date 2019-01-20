import styled from '@emotion/styled/macro'
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toUrl } from 'libs/routes'
import Card from 'components/molecules/Card'
import Image from 'components/atoms/Image'

class MangaCard extends React.PureComponent {
  render () {
    const { manga, artists, classNames, onItemClick, size } = this.props
    const artist = artists[manga.artistId] || {}

    const { id, shortTitle } = manga
    const mangaUrl = toUrl('mangaDetail', { mangaId: id })
    const thumbnail = <Image {...manga.previewImages[0]} />

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
        />
      </Container>
    )
  }
}

const Container = styled(Link)(props => {
  return {
    textDecoration: 'none',
    color: props.theme.colors.onSurface
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style,
    artists: state.entities.artists || {}
  }
}

export default connect(mapStateToProps)(MangaCard)
