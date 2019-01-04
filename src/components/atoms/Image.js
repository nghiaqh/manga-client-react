import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
class Image extends PureComponent {
  render () {
    switch (this.props.style) {
      case 'material':
        return this.renderMaterialVersion(this.props)
      default:
        return this.renderBasicVersion(this.props)
    }
  }

  renderBasicVersion (props) {
    return (
      <image className='image--basic' src={props.src} />
    )
  }

  renderMaterialVersion (props) {
    return (
      <image className='iamge--material' src={props.src} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    style: state.style
  }
}

export default connect(mapStateToProps)(Image)
