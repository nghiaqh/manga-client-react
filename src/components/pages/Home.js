import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled/macro'
import MangaGrid from 'components/organisms/MangaGrid'

class Home extends PureComponent {
  render () {
    const filter = {}

    return (
      <Container>
        <Helmet>
          <title>Latest mangas | Manga Reader</title>
          <meta name='description' content='Latest mangas' />
        </Helmet>

        <MangaGrid
          id={`mangas-latest`}
          filter={filter}
          pageSize={24}
          // cardSize={{ height: 150, width: 90 }}
          layout='masonry-grid'
        />
      </Container>
    )
  }
}

const Container = styled.div(props => {
  // const { topBarHeight, colors, padding } = props.theme
  return {
    '.not-found-msg': {
      margin: '0 auto'
    }
  }
})

const mapStateToProps = (state) => {
  return {
    mangas: state.entities.mangas || {},
    artists: state.entities.artists || {}
  }
}

export default connect(mapStateToProps)(Home)
