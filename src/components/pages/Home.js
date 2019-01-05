import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { loadMoreMangas } from 'redux/actions/mangaList'
import ContentView from 'components/organisms/ContentView'
import MangaCard from 'components/molecules/MangaCard'

class Home extends PureComponent {
  render () {
    const filter = {}
    const renderMangaCard = manga => (
      <MangaCard key={manga.id} manga={manga} />
    )
    return (
      <ContentView
        id='latest-mangas-home'
        entityType='mangas'
        filter={filter}
        pageSize={24}
        loadMoreFunc={loadMoreMangas}
        renderItem={renderMangaCard}
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

export default connect(mapStateToProps)(Home)
