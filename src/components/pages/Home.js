import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import styled from '@emotion/styled/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import MangaGrid from 'components/organisms/MangaGrid'
import Button from 'components/atoms/Button'

class Home extends PureComponent {
  constructor (props) {
    super(props)
    this.layoutStorageKey = '[manga-client-react] home-layout'
    this.orderStorageKey = '[manga-client-react] home-order'

    this.state = {
      layout: localStorage.getItem(this.layoutStorageKey) || 'masonry-grid',
      order: localStorage.getItem(this.orderStorageKey) || 'DESC'
    }

    this.toggleLayout = this.toggleLayout.bind(this)
    this.toggleOrder = this.toggleOrder.bind(this)
  }

  render () {
    const filter = {}
    const { layout, order } = this.state

    return (
      <>
        <Helmet
          title={'Latest mangas | Manga Reader'}
          meta={[
            {
              name: 'description',
              content: 'Latest mangas'
            }
          ]} />

        <Container>
          <div className='ui-controller'>
            <Button onClick={this.toggleLayout}
              className='btn--no-border waterfall'
              title='Waterfall'
              disabled={layout === 'masonry-grid'}>
              <FontAwesomeIcon icon='align-left' size='lg' />
            </Button>
            <Button onClick={this.toggleLayout}
              className='btn--no-border'
              title='Uniform'
              disabled={layout === 'grid'}>
              <FontAwesomeIcon icon='th' size='lg' />
            </Button>
            <Button onClick={this.toggleOrder}
              className='btn--no-border'
              title={`Sort: ${order === 'DESC' ? 'Old' : 'New'}`}>
              <FontAwesomeIcon
                icon={order === 'DESC' ? 'sort-numeric-up' : 'sort-numeric-down'}
                size='lg' />
            </Button>
          </div>

          <MangaGrid
            id={`mangas-latest`}
            filter={filter}
            pageSize={24}
            cardSize={layout === 'grid' ? { height: 325, width: 200 } : null}
            layout={layout}
            order={`latestPublishedAt ${order}`}
          />
        </Container>
      </>
    )
  }

  toggleLayout () {
    this.setState(prevState => {
      const layout = prevState.layout === 'masonry-grid' ? 'grid' : 'masonry-grid'
      localStorage.setItem(this.layoutStorageKey, layout)
      return { layout }
    })
  }

  toggleOrder () {
    this.setState(prevState => {
      const order = prevState.order === 'DESC' ? 'ASC' : 'DESC'
      localStorage.setItem(this.orderStorageKey, order)
      return { order }
    })
  }
}

const Container = styled.div(props => {
  const { padding } = props.theme
  return {
    '.not-found-msg': {
      margin: '0 auto'
    },

    '.ui-controller': {
      textAlign: 'right',
      padding,
      paddingBottom: 0
    },

    'button.waterfall svg': {
      transform: 'rotate(90deg)'
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
