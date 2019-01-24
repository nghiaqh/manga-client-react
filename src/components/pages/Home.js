import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled/macro'
import { loadMoreMangas } from 'redux/actions/mangaList'
import { CloseButton } from 'components/atoms/Button'
import ContentView from 'components/organisms/ContentView'
import MangaCard from 'components/molecules/MangaCard'
import MangaDetail from 'components/organisms/MangaDetail'

class Home extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      currentManga: null
    }

    this.quickView = this.quickView.bind(this)
    this.closeQuickView = this.closeQuickView.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  render () {
    const filter = {}
    const renderMangaCard = manga => (
      <MangaCard key={manga.id} manga={manga}
        onItemClick={this.quickView} />
    )
    const { currentManga } = this.state

    return (
      <Container>
        <ContentView
          id='mangas-latest'
          entityType='mangas'
          filter={filter}
          pageSize={24}
          loadMoreFunc={loadMoreMangas}
          renderItem={renderMangaCard}
          layout='masonGrid'
        />

        { currentManga &&
          <div className='manga-detail'>
            <div className='manga-detail__content'>
              <CloseButton onClick={this.closeQuickView} />
              <MangaDetail match={{
                params: {
                  mangaId: currentManga
                }
              }} />
            </div>
          </div>
        }
      </Container>
    )
  }

  componentDidMount () {
    document.addEventListener('keydown', this.handleKeyDown)
    this.bodyOverflow = document.body.style.overflow
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
    document.body.style.overflow = this.bodyOverflow
  }

  /* TODO: put MangaDetail as component directly under <App/> and click on MangaCard will trigger this view
  */
  quickView (e) {
    e.preventDefault()
    document.body.style.overflow = 'hidden'
    const mangaId = e.currentTarget.dataset.key
    this.setState({
      currentManga: mangaId
    })

    const manga = this.props.mangas[mangaId]
    window.history.pushState({}, manga.title, e.currentTarget.href)
  }

  closeQuickView () {
    document.body.style.overflow = this.bodyOverflow
    this.setState({
      currentManga: null
    })

    window.history.pushState({}, 'Home', '/')
  }

  handleKeyDown (e) {
    switch (e.key) {
      case 'Escape':
        e.stopPropagation()
        return this.state.currentManga && this.closeQuickView()
      default:
        return null
    }
  }
}

const Container = styled.div(props => {
  const { topBarHeight, colors, padding } = props.theme
  return {
    '.manga-detail': {
      position: 'fixed',
      top: topBarHeight,
      height: `calc(100% - ${topBarHeight}px)`,
      width: '100%',
      overflowY: 'auto',
      background: 'rgba(0, 0, 0, 0.7)',

      '.manga-detail__content': {
        margin: `0 auto`,
        minHeight: '100%',
        maxWidth: 1200,
        padding: `${padding}px`,
        backgroundColor: colors.background,
        color: colors.onBackground,
        boxSizing: 'border-box',

        '> button': {
          cursor: 'pointer',
          float: 'right'
        },

        '> div': {
          clear: 'both'
        }
      }
    },

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
