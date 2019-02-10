import styled from '@emotion/styled/macro'
import React from 'react'
import { connect } from 'react-redux'
import { getImageUrl } from 'libs/apiRoutes'

class Image extends React.PureComponent {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
    this.setWidth = this.setWidth.bind(this)
  }

  render () {
    const { className, title, src } = this.props
    return (
      <BasicImage className={`image--basic ${className || ''}`}
        alt={title}
        src={getImageUrl(src)}
        ref={this.ref}
      />
    )
  }

  componentDidMount () {
    this.setWidth()
    window.addEventListener('resize', this.setWidth)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.setWidth)
  }

  setWidth () {
    if (this.props.setWidth) this.props.setWidth(this.ref, this.props)
  }
}

const BasicImage = styled.img(props => {
  return {
    maxHeight: '100%',
    width: '100%'
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Image)
