import React, { PureComponent } from 'react'
import List from 'components/organisms/List'
import Grid from 'components/organisms/Grid'
import Slider from 'components/organisms/Slider'
import WithLoadMore from 'components/organisms/WithLoadMore'

export default class ContentView extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      layout: props.layout || 'grid'
    }

    this.renderList = this.renderList.bind(this)
    this.renderGrid = this.renderGrid.bind(this)
    this.renderSlider = this.renderSlider.bind(this)
  }

  render () {
    const {
      filter,
      order,
      pageSize,
      id,
      entityType,
      loadMoreFunc,
      renderItem
    } = this.props
    let renderLayout

    switch (this.state.layout) {
      case 'list':
        renderLayout = this.renderList
        break
      case 'slider':
        renderLayout = this.renderSlider
        break
      case 'grid':
      default:
        renderLayout = this.renderGrid
    }

    return (
      <WithLoadMore
        id={id}
        entityType={entityType}
        renderLayout={renderLayout}
        renderItem={renderItem}
        loadMore={loadMoreFunc}
        filter={filter}
        pageSize={pageSize}
        order={order}
      />
    )
  }

  renderList (items, retrievingItems, renderItem) {
    return (
      <List
        items={items}
        retrievingItems={retrievingItems}
        renderItem={renderItem}
      />
    )
  }

  renderGrid (items, retrievingItems, renderItem) {
    return (
      <Grid
        items={items}
        retrievingItems={retrievingItems}
        renderItem={renderItem}
      />
    )
  }

  renderSlider (items, retrievingItems, renderItem) {
    return (
      <Slider
        items={items}
        retrievingItems={retrievingItems}
        renderItem={renderItem}
      />
    )
  }
}
