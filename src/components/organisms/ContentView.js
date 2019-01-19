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
        hideLoadMoreBtn={this.state.layout === 'slider'}
      />
    )
  }

  renderList (items, retrievingItems, render) {
    return (
      <List
        items={items}
        retrievingItems={retrievingItems}
        render={render}
      />
    )
  }

  renderGrid (items, retrievingItems, render) {
    return (
      <Grid
        items={items}
        retrievingItems={retrievingItems}
        render={render}
        layoutDirection={this.props.layoutDirection}
      />
    )
  }

  renderSlider (items, retrievingItems, render, loadMore) {
    return (
      <Slider
        items={items}
        retrievingItems={retrievingItems}
        render={render}
        loadMore={loadMore}
        layoutDirection={this.props.layoutDirection}
        endSlide={this.props.endSlide}
      />
    )
  }
}
