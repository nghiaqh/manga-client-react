import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'

export default class Grid extends PureComponent {
  constructor (props) {
    super(props)

    this.state = {
      xsmall: 2,
      small: 4,
      medium: 6,
      large: 8,
      xlarge: 12
    }
  }

  render () {
    const { retrievingItems, render } = this.props
    const cols = Object.assign(this.state, this.props.cols)
    const items = this.props.items.filter(item => item && item.id)
      .map(item => render(item))
    const statusText = (items.length === 0 && !retrievingItems)
      ? <NotFoundMessage />
      : (retrievingItems ? <Loader /> : '')

    return (
      <>
        <GridContainer
          {...cols}
        >
          {items}
        </GridContainer>
        {statusText}
      </>
    )
  }
}

const breakpoints = [400, 641, 1008, 1400]
const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
)
const GridContainer = styled('div')(props => {
  const { xsmall, small, medium, large, xlarge } = props
  return {
    display: 'grid',
    gridGap: '10px',
    gridTemplateRows: 'auto',
    gridTemplateColumns: `repeat(${xsmall}, calc((100% - 10px) / ${xsmall}))`,
    padding: '10px',

    [mq[0]]: {
      gridTemplateColumns: `repeat(${small}, calc((100% - 10px * (${small} - 1)) / ${small}))`
    },
    [mq[1]]: {
      gridTemplateColumns: `repeat(${medium}, calc((100% - 10px * (${medium} - 1)) / ${medium}))`
    },
    [mq[2]]: {
      gridTemplateColumns: `repeat(${large}, calc((100% - 10px * (${large} - 1)) / ${large}))`
    },
    [mq[3]]: {
      gridTemplateColumns: `repeat(${xlarge}, calc((100% - 10px * (${xlarge} - 1)) / ${xlarge}))`
    }
  }
})
