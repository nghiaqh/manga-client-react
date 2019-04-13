import styled from '@emotion/styled/macro'
import React from 'react'
import { getImageUrl } from 'libs/apiRoutes'

export default class ProgressiveImage extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      preview: true,
      size: props.size || 180
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
        src={getImageUrl(src, preview ? 9 : size)}
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
    const { top, bottom } = this.ref.current.getBoundingClientRect()

    if ((top >= 0 && top <= innerHeight) ||
      (bottom >= 0 && bottom <= innerHeight)) {
      this.setState({
        preview: false,
        size: this.props.size
          ? this.props.size
          : 360
      })
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
