import styled from '@emotion/styled/macro'
import React from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'

export default class Grid extends React.PureComponent {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
  }

  render () {
    const { retrievingItems, render, colWidth } = this.props

    const items = this.props.items.filter(item => item && item.id)
      .map(item => <div className='grid__item' key={item.id}>
        {render(item)}
      </div>)

    const statusText = (items.length === 0 && !retrievingItems)
      ? <NotFoundMessage />
      : (retrievingItems ? <Loader /> : '')

    return (
      <Container className={`content-grid ${items.length === 0 && 'empty'}`}>
        {this.props.children}
        {items.length > 0 &&
          <StyledGrid ref={this.ref} colWidth={colWidth}>
            {items}
          </StyledGrid>
        }
        {statusText}
      </Container>
    )
  }
}

const StyledGrid = styled('div')(props => {
  const { theme } = props
  let colWidth = props.colWidth || '200px'
  if (Number.isInteger(colWidth)) colWidth = `${colWidth}px`

  return {
    display: 'grid',
    gridGap: theme.padding / 2,
    gridTemplateColumns: `repeat(auto-fill, minmax(${colWidth}, 1fr))`,
    padding: theme.padding / 2,

    '.grid__item': {
      height: 'max-content'
    }
  }
})

const Container = styled('div')(props => {
  return {
    '.not-found-msg': {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      margin: '0 auto'
    },

    '&.empty': {
      display: 'flex'
    }
  }
})
