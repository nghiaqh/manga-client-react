import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'

export default class Slider extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      retrievingItems: false
    }

    this.ref = React.createRef()
    this.handleScroll = throttle(this.handleScroll.bind(this), 400)
    this.handleMouseWheel = this.handleMouseWheel.bind(this)
    this.loadMore = debounce(this.loadMore.bind(this), 200)
  }

  render () {
    const { retrievingItems, render, layoutDirection, lastSlide } = this.props
    const items = this.props.items.filter(item => item && item.id)

    const slides = items.map((item, index) =>
      <div className='slide' key={item.id || index}>
        {render(item)}
      </div>)

    const statusText =
      <div className='slide slide--status' key='status-text'>
        {(items.length === 0 && !retrievingItems)
          ? <NotFoundMessage />
          : (retrievingItems ? <Loader /> : lastSlide || '')}
      </div>

    slides.push(statusText)

    return (
      <>
        <StyledSlider
          className={`content-slider ${items.length === 0 && 'empty'}`}
          direction={layoutDirection}>

          {this.props.children}

          <div className='slider__main' ref={this.ref}>
            {slides}
          </div>
        </StyledSlider>
      </>
    )
  }

  componentDidUpdate (prevProps) {
    if (this.props.items.length > prevProps.items.length) {
      this.setState({ retrievingItems: false })
    }
  }

  componentDidMount () {
    this.ref.current.addEventListener(
      'wheel',
      this.handleMouseWheel,
      { passive: true })
    this.ref.current.addEventListener(
      'scroll',
      this.handleScroll,
      { passive: true })
  }

  componentWillUnmount () {
    this.loadMore.cancel()
    this.ref.current.removeEventListener('wheel', this.handleMouseWheel)
    this.ref.current.removeEventListener('scroll', this.handleScroll)
  }

  handleMouseWheel (event) {
    const direction = this.props.layoutDirection || 'ltr'
    const { deltaMode, deltaY: dy } = event
    const deltaY = deltaMode === 1 ? dy * 50 : dy * 2
    if (direction === 'ltr') {
      this.ref.current.scrollLeft += deltaY
    } else {
      this.ref.current.scrollLeft -= deltaY
    }
  }

  handleScroll (event) {
    const slider = this.ref.current
    const lastSlide = slider.lastElementChild
    const isLastSlideVisible = lastSlide &&
      lastSlide.getBoundingClientRect().right > 0

    if (isLastSlideVisible) {
      this.loadMore()
    }
  }

  loadMore () {
    if (this.state.retrievingItems || !this.props.loadMore) return
    this.setState({ retrievingItems: true })
    this.props.loadMore()
  }
}

const StyledSlider = styled.div(props => {
  const { theme, direction } = props
  const { padding, colors } = theme
  return {
    height: '100%',
    background: colors.background,
    direction: direction,

    '.slider__main': {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexFlow: 'row nowrap',
      overflowX: 'auto',
      scrollBehavior: 'smooth',
      scrollSnapType: 'mandatory'
    },

    '.slide': {
      margin: '2px',
      display: 'flex',
      flexFlow: 'column',
      justifyContent: 'center',
      scrollSnapAlign: 'start',

      '&:first-of-type': {
        paddingRight: direction === 'rtl' ? padding : 0,
        paddingLeft: direction === 'rtl' ? 0 : padding
      },

      '&:last-child': {
        paddingRight: direction === 'rtl' ? 0 : padding,
        paddingLeft: direction === 'rtl' ? padding : 0
      },

      '&.slide--status': {
        textAlign: 'center',
        direction: 'initial'
      }
    },

    '&.empty .slide': {
      paddingLeft: padding,
      paddingRight: padding
    }
  }
})
