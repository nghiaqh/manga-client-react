import styled from '@emotion/styled/macro'
import equal from 'deep-equal'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'components/atoms/Button'

class WithLoadMore extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      noMoreContent: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.checkNoMoreContent = this.checkNoMoreContent.bind(this)
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
    const { dispatch, filter, loadMore, id, pageSize, order } = this.props
    dispatch(loadMore(id, pageSize, 1, filter, order))
    if (!this.state.onNoMoreContent) this.checkNoMoreContent()
  }

  componentDidUpdate (prevProps, prevState) {
    const {
      dispatch,
      filter,
      id,
      loadMore,
      pageSize,
      order,
      onNoMoreContent
    } = this.props
    const { noMoreContent } = this.state

    if (!noMoreContent) {
      this.checkNoMoreContent()
    } else if (!prevState.noMoreContent && onNoMoreContent) {
      onNoMoreContent()
    }

    if (!equal(filter, prevProps.filter) || order !== prevProps.order) {
      dispatch(loadMore(id, pageSize, 1, filter, order))
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
}

const LoadMoreButton = styled(Button)`
  display: block;
  margin: 10px auto;
`

// container
const mapStateToProps = (state, ownProps) => {
  const { withLoadMore, entities } = state
  const { id, entityType } = ownProps

  return {
    withLoadMore: withLoadMore[id],
    entities: entities[entityType]
  }
}

export default connect(mapStateToProps)(WithLoadMore)
