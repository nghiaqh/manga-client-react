import styled from '@emotion/styled/macro'
import isEqual from 'lodash/isEqual'
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
    const { filter, noMoreContent } = this.state

    this.checkNoMoreContent()

    if (!prevState.noMoreContent && noMoreContent && onNoMoreContent) {
      onNoMoreContent()
    }

    if (!isEqual(filter, prevState.filter) || order !== prevProps.order) {
      dispatch(loadMore(id, pageSize, 1, filter, order))
    }

    if (prevProps.contentFilter !== contentFilter ||
      prevProps.filter !== this.props.filter) {
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

  /**
   * Set noMoreContent state
   */
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

    this.setState(({ noMoreContent }) => {
      if (!retrievingItems && totalPages === pageNumber) {
        return !noMoreContent ? { noMoreContent: true } : null
      } else if (!retrievingItems && totalPages > pageNumber) {
        return noMoreContent ? { noMoreContent: false } : null
      }
    })
  }

  updateFilter () {
    const { includeNSFW } = this.props.contentFilter
    const filter = Object.assign({}, this.state.filter, this.props.filter)
    if (includeNSFW) {
      delete filter.isNSFW
    } else {
      filter.isNSFW = false
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
