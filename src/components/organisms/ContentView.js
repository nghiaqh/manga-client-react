import React, { PureComponent } from 'react'
import List from 'components/organisms/List'
import Grid from 'components/organisms/Grid'
import MasonryGrid from 'components/organisms/MasonryGrid'
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
    this.renderMasonryGrid = this.renderMasonryGrid.bind(this)
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
      renderItem,
      onNoMoreContent,
      hideLoadMoreBtn
    } = this.props
    let renderLayout

    switch (this.state.layout) {
      case 'list':
        renderLayout = this.renderList
        break
      case 'slider':
        renderLayout = this.renderSlider
        break
      case 'masonry-grid':
        renderLayout = this.renderMasonryGrid
        break
      case 'grid':
      default:
        renderLayout = this.renderGrid
    }

    return (
      <WithLoadMore
        id={id}
        domId={`${this.state.layout}-${id}`}
        entityType={entityType}
        renderLayout={renderLayout}
        renderItem={renderItem}
        loadMore={loadMoreFunc}
        filter={filter}
        pageSize={pageSize}
        order={order}
        hideLoadMoreBtn={this.state.layout === 'slider' || hideLoadMoreBtn}
        onNoMoreContent={onNoMoreContent}
      />
    )
  }

  renderList (items, retrievingItems, render) {
    return (
      <List
        items={items}
        retrievingItems={retrievingItems}
        render={render}
      >
        {this.props.children}
      </List>
    )
  }

  renderGrid (items, retrievingItems, render) {
    return (
      <Grid
        items={items}
        retrievingItems={retrievingItems}
        render={render}
        layoutDirection={this.props.layoutDirection}
        colWidth={this.props.colWidth}
      >
        {this.props.children}
      </Grid>
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
        lastSlide={this.props.lastSlide}
      >
        {this.props.children}
      </Slider>
    )
  }

  renderMasonryGrid (items, retrievingItems, render) {
    return (
      <MasonryGrid
        items={items}
        retrievingItems={retrievingItems}
        render={render}
        layoutDirection={this.props.layoutDirection}
      >
        {this.props.children}
      </MasonryGrid>
    )
  }
}
