/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'

export default class List extends React.PureComponent {
  render () {
    const { retrievingItems, render } = this.props
    const items = this.props.items.filter(item => item && item.id)
      .map(item => render(item))
    const statusText = (items.length === 0 && !retrievingItems)
      ? <NotFoundMessage />
      : (retrievingItems ? <Loader /> : '')
    return (
      <div css={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        {items}
        {statusText}
      </div>
    )
  }
}
