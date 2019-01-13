import styled from '@emotion/styled/macro'
import equal from 'deep-equal'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'components/atoms/Button'
import Loader from 'components/atoms/Loader'

class WithLoadMore extends PureComponent {
  constructor (props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  render () {
    const {
      withLoadMore,
      entities,
      id,
      renderLayout,
      renderItem,
      entityType,
      pageSize
    } = this.props
    const data = withLoadMore[id] || {
      items: [],
      pageNumber: 1,
      total: 0,
      pageSize,
      retrievingItems: true
    }
    const { items, pageNumber, total, retrievingItems } = data

    const contents = Array.isArray(items)
      ? items.map(i => entities[entityType][i])
      : []
    const dom = renderLayout(contents, retrievingItems, renderItem, this.handleClick)

    const totalPages = 1 + Math.ceil((total - data.pageSize) / pageSize)
    const showButton = totalPages > pageNumber

    return (
      <React.Fragment>
        {dom}

        {showButton &&
          <LoadMoreButton
            dense
            outlined={!retrievingItems}
            disabled={retrievingItems}
            onClick={this.handleClick}
          >
            {retrievingItems ? <Loader /> : 'Load More'}
          </LoadMoreButton>
        }
      </React.Fragment>
    )
  }

  componentDidMount () {
    const { dispatch, filter, loadMore, id, pageSize, order } = this.props
    dispatch(loadMore(id, pageSize, 1, filter, order))
    // window.addEventListener('scroll', this.handleScroll);
  }

  componentDidUpdate (prevProps) {
    const {
      dispatch,
      filter,
      id,
      loadMore,
      pageSize,
      order
    } = this.props
    if (equal(filter, prevProps.filter) && order === prevProps.order) return

    dispatch(loadMore(id, pageSize, 1, filter, order))
  }

  handleClick () {
    const { dispatch, withLoadMore, id, loadMore, order, pageSize } = this.props
    const { pageNumber, total, filter } = withLoadMore[id]
    const totalPages = Math.ceil(total / pageSize)
    const newPageNumber = Math.ceil(withLoadMore[id].pageSize / pageSize) + pageNumber

    if (newPageNumber <= totalPages) {
      dispatch(loadMore(id, pageSize, newPageNumber, filter, order))
    }
  }
}

const LoadMoreButton = styled(Button)`
  display: block;
  margin: 10px auto;
`

// container
const mapStateToProps = (state) => {
  const { withLoadMore, entities } = state

  return {
    withLoadMore,
    entities
  }
}

export default connect(mapStateToProps)(WithLoadMore)
