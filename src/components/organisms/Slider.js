import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'

export default class Slider extends PureComponent {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
    this.handleScroll = this.handleScroll.bind(this)
    this.handleMouseWheel = this.handleMouseWheel.bind(this)
  }
  render () {
    const { retrievingItems, render } = this.props
    const items = this.props.items.filter(item => item && item.id)
      .map((item, index) =>
        <div className='slide' key={item.id || index}>
          {render(item)}
        </div>)
    const statusText = (items.length === 0 && !retrievingItems)
      ? <NotFoundMessage />
      : (retrievingItems ? <Loader /> : '')

    return (
      <>
        <SliderContainer className='slider'
          ref={this.ref}
          onScroll={this.handleScroll}
          onWheel={this.handleMouseWheel}>
          {items}
        </SliderContainer>
        {statusText}
      </>
    )
  }

  handleScroll (event) {
    const slider = this.ref.current
    if (slider.scrollLeft === 0) {
      this.props.loadMore()
    }
  }

  handleMouseWheel (event) {
    this.ref.current.scrollLeft -= event.deltaY
  }
}

const SliderContainer = styled.div(props => {
  return {
    height: '100%',
    width: '100%',
    cursor: 'pointer',
    overflowX: 'auto',
    overflowY: 'hidden',
    display: 'flex',
    flexDirection: 'row-reverse',
    background: props.theme.colors.background,

    '.slide': {
      padding: '0 0 0 1px',
      userSelect: 'none'
    }
  }
})
