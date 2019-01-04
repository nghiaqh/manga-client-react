import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Typography extends PureComponent {
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
      <div className='text--basic'>{props.children}</div>
    )
  }

  renderMaterialVersion (props) {
    return (
      <div className='text--material'>{props.children}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    style: state.style
  }
}

export default connect(mapStateToProps)(Typography)
