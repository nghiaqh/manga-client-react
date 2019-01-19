import styled from '@emotion/styled/macro'
import React from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'

export default class Grid extends React.PureComponent {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
    this.resizeAllGridItems = this.resizeAllGridItems.bind(this)
  }

  render () {
    const { retrievingItems, render } = this.props

    const items = this.props.items.filter(item => item && item.id)
      .map(item => <div className='grid__item' key={item.id}>
        {render(item)}
      </div>)

    const statusText = (items.length === 0 && !retrievingItems)
      ? <NotFoundMessage />
      : (retrievingItems ? <Loader /> : '')

    return (
      <>
        <GridContainer ref={this.ref}>
          {items}
        </GridContainer>
        {statusText}
      </>
    )
  }

  componentDidMount () {
    this.resizeAllGridItems()
    window.addEventListener('resize', this.resizeAllGridItems)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.resizeAllGridItems)
  }

  componentDidUpdate () {
    this.resizeAllGridItems()
  }

  resizeAllGridItems () {
    const grid = this.ref.current
    grid.querySelectorAll('.grid__item').forEach(item =>
      this.resizeGridItem(grid, item))
  }

  resizeGridItem (grid, item) {
    if (!item || !item.children.length) return

    const gridStyle = window.getComputedStyle(grid)
    const rowHeight = parseInt(gridStyle.getPropertyValue('grid-auto-rows'))
    const rowGap = parseInt(gridStyle.getPropertyValue('grid-row-gap'))
    let rowSpan = Math.ceil(
      (item.children[0].getBoundingClientRect().height + rowGap) /
      (rowHeight + rowGap)
    )
    item.style.gridRowEnd = `span ${rowSpan}`
  }
}

const GridContainer = styled('div')(props => {
  const { theme } = props
  const colWidth = props.colWidth || '200px'

  return {
    display: 'grid',
    gridGap: theme.padding / 2,
    gridTemplateColumns: `repeat(auto-fill, minmax(${colWidth}, 1fr))`,
    gridAutoRows: theme.padding / 2,
    padding: theme.padding / 2,

    '.grid__item': {
      height: 'max-content'
    }
  }
})
