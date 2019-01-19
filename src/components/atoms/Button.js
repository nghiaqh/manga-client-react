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
      <button id={props.id}
        className={`button--basic ${props.className || ''}`}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.children}
      </button>
    )
  }

  renderMaterialVersion (props) {
    return (
      <button id={props.id}
        className={`button--material ${props.className || ''}`}
        onClick={props.onClick}
        disabled={props.disabled}>
        {props.children}
      </button>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Button)
