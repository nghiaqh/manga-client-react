import React from 'react'
import styled from '@emotion/styled/macro'

export default React.forwardRef(({ onChange, placeHolder }, ref) =>
  <InputContainer>
    <input
      id='search-box'
      type='text'
      autoFocus
      ref={ref}
      placeholder={placeHolder || 'Search mangas, chapters, artists'}
      onChange={onChange} />
  </InputContainer>
)

const InputContainer = styled.div(props => {
  const { colors, transition, topBarHeight, padding } = props.theme
  return {
    display: 'flex',
    alignItems: 'center',
    transition,
    background: colors.background,
    color: colors.onBackground,
    paddingLeft: padding,

    input: {
      background: colors.background,
      color: colors.onBackground,
      fontSize: '1.1em',
      border: 'none',
      borderBottom: `1px solid ${colors.border}`,
      outline: 'none',
      boxSizing: 'border-box',
      height: topBarHeight,
      maxWidth: 600,
      width: '100%'
    }
  }
})
