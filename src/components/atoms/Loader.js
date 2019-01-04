import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Loader extends PureComponent {
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
      <span className='loader--basic'>Loading...</span>
    )
  }

  renderMaterialVersion (props) {
    return (
      <span className='loader--material'>Loading...</span>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    style: state.style
  }
}

export default connect(mapStateToProps)(Loader)
