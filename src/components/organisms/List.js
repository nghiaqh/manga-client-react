import styled from '@emotion/styled/macro'
import React from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'

export default class List extends React.PureComponent {
  render () {
    const { retrievingItems, render } = this.props
    const items = this.props.items.filter(item => item && item.id)
      .map(item => <li key={item.id}>{render(item)}</li>)
    const statusText = (items.length === 0 && !retrievingItems)
      ? <NotFoundMessage />
      : (retrievingItems ? <Loader /> : '')
    return (
      <Box className={`content-list ${items.length === 0 && 'empty'}`}>
        {this.props.children}
        <ol className='items'>
          {items}
        </ol>
        {statusText}
      </Box>
    )
  }
}

const Box = styled.div(props => {
  const { padding, transition } = props.theme
  return {
    display: 'flex',
    flexDirection: 'column',

    '.items': {
      margin: 0,

      '> li': {
        padding: padding / 4,
        transition: transition(0.2),

        a: {
          textDecoration: 'none'
        }
      }
    }
  }
})
