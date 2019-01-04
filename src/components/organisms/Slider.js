import React, { PureComponent } from 'react'
import Loader from 'components/atoms/Loader'
import NotFoundMessage from 'components/molecules/NotFoundMessage'

export default class Slider extends PureComponent {
  render () {
    const { id, retrievingItems, render } = this.props
    const items = this.props.items.filter(item => item && item.id)
      .map(item => render(item))
    const statusText = (items.length === 0 && !retrievingItems)
      ? <NotFoundMessage />
      : (retrievingItems ? <Loader /> : '')
    return (
      <>
        <div id={id}>{items}</div>
        {statusText}
      </>
    )
  }
}
