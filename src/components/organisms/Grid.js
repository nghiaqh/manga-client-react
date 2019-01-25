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
      <div className='content-grid'>
        <GridContainer ref={this.ref} colWidth={colWidth}>
          {items}
        </GridContainer>
        {statusText}
      </div>
    )
  }
}

const GridContainer = styled('div')(props => {
  const { theme } = props
  const colWidth = props.colWidth || '200px'

  return {
    display: 'grid',
    gridGap: theme.padding / 2,
    gridTemplateColumns: `repeat(auto-fill, minmax(${colWidth}px, 1fr))`,
    padding: theme.padding / 2,

    '.grid__item': {
      height: 'max-content'
    }
  }
})
