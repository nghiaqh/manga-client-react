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
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
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
          <div className='slider__controller'>
            <span className='slider__controller--left' onClick={this.scrollLeft}>Left</span>
            <span className='slider__controller--right' onClick={this.scrollRight}>Right</span>
          </div>
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

  scrollLeft () {
    const slider = this.ref.current
    const childWidth = slider.firstElementChild.offsetWidth
    if (slider.scrollLeft >= childWidth) {
      slider.scrollLeft -= childWidth
    }
  }

  scrollRight () {
    const slider = this.ref.current
    const childWidth = slider.firstElementChild.offsetWidth
    slider.scrollLeft += childWidth
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
      padding: '0 0 0 2px',
      userSelect: 'none'
    },

    '.slider__controller': {
      position: 'fixed',
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',

      span: {
        fontSize: '1.5rem',
        background: props.theme.colors.surface,
        color: props.theme.colors.onSurface,
        padding: `0 ${props.theme.padding / 2}px`,
        userSelect: 'none'
      },
      'slider__controller--left': {
        textAlight: 'left'
      },
      'slider__controller--right': {
        textAlight: 'right'
      }
    }
  }
})
