import styled from '@emotion/styled/macro'
import React from 'react'
import { connect } from 'react-redux'
import { getImageUrl } from 'libs/apiRoutes'

class Image extends React.PureComponent {
  constructor (props) {
    super(props)
    this.ref = React.createRef()
  }

  render () {
    switch (this.props.style) {
      case 'material':
        return this.renderMaterialVersion(this.props)
      default:
        return this.renderBasicVersion(this.props)
    }
  }

  componentDidMount () {
    this.props.handleOnLoad(this.ref, this.props)
  }

  renderBasicVersion (props) {
    return (
      <BasicImage className='image--basic'
        alt={props.title}
        src={getImageUrl(props.src)}
        ref={this.ref}
      />
    )
  }

  renderMaterialVersion (props) {
    return (
      <img className='image--material'
        alt={props.title}
        src={getImageUrl(props.src)}
        ref={this.ref}
      />
    )
  }
}

const BasicImage = styled.img(props => {
  return {
    maxHeight: '100%',
    width: '100%',
    transition: 'width 0.66s ease-out'
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Image)
