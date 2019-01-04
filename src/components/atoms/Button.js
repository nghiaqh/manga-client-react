import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Button extends PureComponent {
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
      <button className='button--basic'>{props.children}</button>
    )
  }

  renderMaterialVersion (props) {
    return (
      <button className='button--material'>{props.children}</button>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    style: state.style
  }
}

export default connect(mapStateToProps)(Button)
