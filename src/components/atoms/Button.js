import styled from '@emotion/styled/macro'
import React from 'react'
import { connect } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Button = (props) => {
  const { id, className, onClick, disabled, title, children } = props
  return (
    <StyledButton id={id}
      className={`button--basic ${className || ''}`}
      onClick={onClick}
      disabled={disabled}
      title={title}>
      {children}
    </StyledButton>
  )
}

const StyledButton = styled.button(props => {
  const { colors, borderRadius, transition } = props.theme

  return {
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: '1em',
    borderRadius,
    transition,
    background: colors.secondary,
    color: colors.onSecondary,

    '&:hover': {
      background: colors.secondaryDark,
      color: colors.onSecondaryDark
    },

    '&.btn--plain': {
      border: 'none',
      background: 'none',
      color: colors.secondary,

      '&:hover': {
        color: colors.secondaryDark
      }
    },

    '&.btn--outlined': {
      border: `2px solid ${colors.secondary}`,
      color: colors.secondary,

      '&:hover': {
        color: colors.secondaryDark,
        borderColor: colors.secondaryDark
      }
    },

    '&:disabled, &:disabled:hover': {
      color: colors.border,
      borderColor: colors.border,
      cursor: 'not-allowed'
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Button)

export function CloseButton ({ onClick }) {
  return <Button className='btn--plain' onClick={onClick}>
    <FontAwesomeIcon icon='times' size='2x' />
  </Button>
}
