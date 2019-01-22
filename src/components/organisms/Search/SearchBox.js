import React from 'react'
import styled from '@emotion/styled/macro'

export default function SearchBox ({ onChange, onFocus, placeHolder, ref }) {
  return (
    <Input
      id='search-box'
      type='text'
      autoFocus
      placeholder={placeHolder || 'Search mangas, chapters, artists'}
      onChange={onChange}
      onFocus={onFocus} />
  )
}

const Input = styled.input(props => {
  const { colors, padding, transition, topBarHeight, borderRadius } = props.theme
  return {
    border: `3px solid ${colors.onBackground}`,
    borderRadius,
    outline: 'none',
    background: colors.background,
    color: colors.onBackground,
    padding: padding,
    width: '90%',
    maxWidth: 600,
    margin: '0 auto',
    display: 'block',
    maxHeight: topBarHeight,
    boxSizing: 'border-box',
    transition,
    fontSize: '1.2em',

    '&:hover': {
    }
  }
})
