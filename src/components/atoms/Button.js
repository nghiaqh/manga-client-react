import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
      <StyledButton id={props.id}
        className={`button--basic ${props.className || ''}`}
        onClick={props.onClick}
        disabled={props.disabled}
        title={props.title}>
        {props.children}
      </StyledButton>
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

const StyledButton = styled.button(props => {
  const { padding } = props.theme

  return {
    padding: padding / 3,
    outline: 'none',
    border: 'none',
    background: 'none',
    color: 'inherit',
    cursor: 'pointer',
    fontWeight: 600
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Button)

export function CloseButton ({ onClick }) {
  return <Button id='search-panel--close-btn' onClick={onClick}>
    <FontAwesomeIcon icon='times' size='2x' />
  </Button>
}
