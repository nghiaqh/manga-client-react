import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'

export default class Slider extends PureComponent {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
    this.handleScroll = this.handleScroll.bind(this)
    this.scrollLeft = this.scrollLeft.bind(this)
    this.scrollRight = this.scrollRight.bind(this)
    this.state = {
      slider: this.ref
    }
  }
  render () {
    const { retrievingItems, render } = this.props
    const items = this.props.items.filter(item => item && item.id)

    const slides = items.map((item, index) =>
      <div className='slide' key={item.id || index}>
        {render(item)}
      </div>)

    const statusText = (items.length === 0 && !retrievingItems)
      ? <NotFoundMessage />
      : (retrievingItems ? <Loader /> : '')

    return (
      <>
        <StyledSlider className='slider'
          ref={this.ref}
          onScroll={this.handleScroll}>
          <div className='slider__controller'>
            <span className='slider__controller--left' onClick={this.scrollLeft}>Left</span>
            <span className='slider__controller--right' onClick={this.scrollRight}>Right</span>
          </div>
          <div className='slider__main'>
            {slides}
          </div>
        </StyledSlider>
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

  scrollLeft () {
    const slider = this.ref.current
    const slide = slider.querySelector('.slide')
    slider.scrollLeft -= slide ? slide.clientWidth : 0
    console.log('left controller: ', slider.scrollLeft)
  }

  scrollRight () {
    const slider = this.ref.current
    const slide = slider.querySelector('.slide')
    slider.scrollLeft += slide ? slide.clientWidth : 0
    console.log('right controller: ', slider.scrollLeft)
  }
}

const StyledSlider = styled.div(props => {
  return {
    height: '100%',
    overflowY: 'hidden',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'row-reverse',
    background: props.theme.colors.background,

    '.slider__main': {
      height: '100%',
      display: 'flex',
      flexDirection: 'row-reverse',
      justifyContent: 'flex-end'
    },

    '.slide': {
      padding: '0 0 0 2px',
      userSelect: 'none'
    },

    '.slider__controller': {
      position: 'fixed',
      top: 0,
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
