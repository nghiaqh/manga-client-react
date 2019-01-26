import styled from '@emotion/styled/macro'
import equal from 'deep-equal'
// import merge from 'lodash/merge'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'components/atoms/Button'

class WithLoadMore extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      noMoreContent: false,
      filter: props.filter
    }

    if (!props.contentFilter.includeNSFW) {
      this.state.filter.isNSFW = false
    }

    this.handleClick = this.handleClick.bind(this)
    this.checkNoMoreContent = this.checkNoMoreContent.bind(this)
    this.updateFilter = this.updateFilter.bind(this)
  }

  render () {
    const {
      withLoadMore,
      entities,
      id,
      renderLayout,
      renderItem,
      pageSize,
      hideLoadMoreBtn
    } = this.props
    const data = withLoadMore || {
      items: [],
      pageNumber: 1,
      total: 0,
      pageSize,
      retrievingItems: true
    }
    const { items, retrievingItems } = data

    const contents = Array.isArray(items)
      ? items.map(i => entities[i])
      : []
    const dom = renderLayout(contents, retrievingItems, renderItem,
      this.handleClick)

    const showButton = !this.state.noMoreContent && !hideLoadMoreBtn

    return (
      <div id={id}>
        {dom}

        {showButton &&
          <LoadMoreButton
            dense
            outlined={!retrievingItems}
            disabled={retrievingItems}
            onClick={this.handleClick}
          >
            {!retrievingItems && 'More'}
          </LoadMoreButton>
        }
      </div>
    )
  }

  componentDidMount () {
    const { dispatch, loadMore, id, pageSize, order } = this.props
    const { filter, onNoMoreContent } = this.state
    dispatch(loadMore(id, pageSize, 1, filter, order))
    if (!onNoMoreContent) this.checkNoMoreContent()
  }

  componentDidUpdate (prevProps, prevState) {
    const {
      dispatch,
      id,
      loadMore,
      pageSize,
      order,
      onNoMoreContent,
      contentFilter
    } = this.props
    const { noMoreContent, filter } = this.state

    if (!noMoreContent) {
      this.checkNoMoreContent()
    } else if (!prevState.noMoreContent && onNoMoreContent) {
      onNoMoreContent()
    }

    if (!equal(filter, prevState.filter) || order !== prevProps.order) {
      dispatch(loadMore(id, pageSize, 1, filter, order))
    }

    if (prevProps.contentFilter !== contentFilter) {
      this.updateFilter()
    }
  }

  handleClick () {
    const { dispatch, withLoadMore, id, loadMore, order, pageSize } = this.props
    const { pageNumber, total, filter } = withLoadMore
    const totalPages = Math.ceil(total / pageSize)
    const newPageNumber = Math.ceil(withLoadMore.pageSize / pageSize) + pageNumber

    if (newPageNumber <= totalPages) {
      dispatch(loadMore(id, pageSize, newPageNumber, filter, order))
    }
  }

  checkNoMoreContent () {
    const {
      withLoadMore,
      pageSize
    } = this.props
    const data = withLoadMore || {
      items: [],
      pageNumber: 1,
      total: 0,
      pageSize,
      retrievingItems: true
    }
    const { pageNumber, total, retrievingItems } = data

    const totalPages = 1 + Math.ceil((total - data.pageSize) / pageSize)

    if (!retrievingItems && totalPages <= pageNumber &&
      !this.state.noMoreContent) {
      this.setState({
        noMoreContent: true
      })
    }
  }

  updateFilter () {
    const { includeNSFW } = this.props.contentFilter
    const filter = Object.assign({}, this.state.filter)
    if (includeNSFW) {
      delete filter.isNSFW
      console.log('show NSFW content')
    } else {
      filter.isNSFW = false
      console.log('hide NSFW content')
    }
    this.setState({ filter })
  }
}

const LoadMoreButton = styled(Button)`
  display: block;
  margin: 10px auto;
`

// container
const mapStateToProps = (state, ownProps) => {
  const { withLoadMore, entities, contentFilter } = state
  const { id, entityType } = ownProps

  return {
    withLoadMore: withLoadMore[id],
    entities: entities[entityType],
    contentFilter: contentFilter || {}
  }
}

export default connect(mapStateToProps)(WithLoadMore)
