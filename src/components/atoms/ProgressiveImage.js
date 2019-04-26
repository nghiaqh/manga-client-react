import styled from '@emotion/styled/macro'
import React from 'react'
import { getImageUrl } from 'libs/apiRoutes'

const THUMBWIDTHS = [ 9, 360, 600 ]

export default class ProgressiveImage extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      size: THUMBWIDTHS[0]
    }

    this.ref = React.createRef()
    this.setWidth = this.setWidth.bind(this)
    this.loadImage = this.loadImage.bind(this)
  }

  render () {
    const { className, title, src } = this.props
    const { preview, size } = this.state

    return (
      <BasicImage
        className={`image--progressive
          ${preview ? 'preview' : ''}
          ${className || ''}`}
        alt={title}
        src={getImageUrl(src, size)}
        ref={this.ref}
      />
    )
  }

  componentDidMount () {
    this.setWidth()
    this.loadImage()
    window.addEventListener('resize', this.setWidth, false)
    window.addEventListener('resize', this.loadImage, false)
    window.addEventListener('scroll', this.loadImage, false)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setWidth)
    window.removeEventListener('resize', this.loadImage)
    window.removeEventListener('scroll', this.loadImage)
  }

  setWidth () {
    if (this.props.setWidth) this.props.setWidth(this.ref, this.props)
  }

  loadImage () {
    const { innerHeight } = window
    const { top, bottom, width, height } = this.ref.current.getBoundingClientRect()
    const { width: imgW, height: imgH } = this.props

    // calculate optimal size of image to load
    // if scale width > default thumbnail sizes, use original size (size = null)
    const scaledHeight = imgH * width / imgW
    const scaledWidth = imgW * (scaledHeight > height ? scaledHeight : height) / imgH
    const maxWidth = Math.min(...THUMBWIDTHS.filter(value =>
      value >= scaledWidth))
    const size = maxWidth === scaledWidth ? null : maxWidth

    if ((top >= 0 && top <= innerHeight) ||
      (bottom >= 0 && bottom <= innerHeight)) {
      this.setState({ size })
    }
  }
}

const BasicImage = styled.img(props => {
  return {
    maxHeight: '100%',
    width: '100%',

    '&.preview': {
      filter: 'blur(0.2vw)'
    },

    '&.reveal': {
      willChange: 'transform, opacity',
      animation: 'reveal 1s ease-out'
    }
  }
})
