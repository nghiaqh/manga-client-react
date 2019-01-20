import styled from '@emotion/styled/macro'
import React from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'
import { common as themeConfig } from 'libs/themes'

export default class MasonGrid extends React.PureComponent {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
    this.state = {
      cols: null,
      gridCols: []
    }
    this.getNumberOfColumn = this.getNumberOfColumn.bind(this)
    this.moveItemsToColumn = this.moveItemsToColumn.bind(this)
  }

  render () {
    const { retrievingItems } = this.props
    const cols = Object.assign({
      xsmall: 1,
      small: 2,
      medium: 4,
      large: 6,
      xlarge: 8
    }, this.props.cols)

    const items = this.props.items.filter(item => item && item.id)
    const gridCols = this.moveItemsToColumn(items)

    const statusText = (items.length === 0 && !retrievingItems)
      ? <NotFoundMessage />
      : (retrievingItems ? <Loader /> : '')

    return (
      <>
        <GridContainer ref={this.ref} cols={cols}>
          {gridCols.map((col, i) =>
            <div className='grid__column' key={`${this.state.cols}-${i}`}>
              {col}
            </div>)}
        </GridContainer>
        {statusText}
      </>
    )
  }

  componentDidMount () {
    this.getNumberOfColumn()
    window.addEventListener('resize', this.getNumberOfColumn)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.getNumberOfColumn)
  }

  getNumberOfColumn () {
    const { breakpoints } = themeConfig || {}
    const cols = Object.assign({
      xsmall: 1,
      small: 2,
      medium: 4,
      large: 6,
      xlarge: 8
    }, this.props.cols)

    const index = !breakpoints ? 0 : breakpoints.findIndex(breakpoint =>
      breakpoint >= window.innerWidth)

    const key = index < 0 ? 'xlarge'
      : ['xsmall', 'small', 'medium', 'large', 'xlarge'][index]
    this.setState({
      cols: cols[key]
    })
  }

  moveItemsToColumn (items) {
    const { render } = this.props
    const gridCols = []

    if (this.state.cols) {
      for (let i = 0; i < this.state.cols; i++) {
        gridCols.push([])
      }

      items.forEach((item, index) => {
        const i = index % this.state.cols
        gridCols[i].push(<div className='item' key={item.id}>{render(item)}</div>)
      })
    }

    return gridCols
  }
}

const GridContainer = styled('div')(props => {
  const { padding, breakpoints } = props.theme
  const { xsmall, small, medium, large, xlarge } = props.cols
  const mq = breakpoints.map(
    bp => `@media (min-width: ${bp}px)`
  )
  const gridGap = padding / 2
  const gridTemplateColumns = (columns, gridGap) => {
    const gap = gridGap * (columns - 1)
    return `repeat(${columns}, calc((100% - ${gap}px) / ${columns}))`
  }

  return {
    display: 'grid',
    gridGap: gridGap,
    gridTemplateRows: 'auto',
    gridTemplateColumns: gridTemplateColumns(xsmall, gridGap),
    padding: padding,

    [mq[0]]: {
      gridTemplateColumns: gridTemplateColumns(small, gridGap)
    },
    [mq[1]]: {
      gridTemplateColumns: gridTemplateColumns(medium, gridGap)
    },
    [mq[2]]: {
      gridTemplateColumns: gridTemplateColumns(large, gridGap)
    },
    [mq[3]]: {
      gridTemplateColumns: gridTemplateColumns(xlarge, gridGap)
    },

    '.grid__column': {
      '.item': {
        marginBottom: padding / 2
      }
    }
  }
})
