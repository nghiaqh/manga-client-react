import styled from '@emotion/styled/macro'
import isEqual from 'lodash/isEqual'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import Button from 'components/atoms/Button'

class WithPagination extends PureComponent {
  constructor (props) {
    super(props)
    this.renderPaginationControl = this.renderPaginationControl.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.loadPagination = this.loadPagination.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  render () {
    const {
      withPagination,
      entities,
      renderLayout,
      renderItem,
      pageSize
    } = this.props
    const data = withPagination || {
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
    const content = renderLayout(contents, retrievingItems, renderItem)
    const control = this.renderPaginationControl()

    return (
      <React.Fragment>
        {content}
        {control}
      </React.Fragment>
    )
  }

  componentDidMount () {
    const { dispatch, filter, load, id, pageSize, pageNumber } = this.props
    dispatch(load(id, pageSize, pageNumber, filter))
    document.addEventListener('keydown', this.handleKeyDown)
  }

  componentWillUnmount () {
    document.removeEventListener('keydown', this.handleKeyDown)
  }

  componentDidUpdate (prevProps) {
    const { dispatch, filter, id, load, pageSize, pageNumber } = this.props
    if (
      isEqual(filter, prevProps.filter) &&
      pageSize === prevProps.pageSize &&
      pageNumber === prevProps.pageNumber
    ) return

    dispatch(load(id, pageSize, pageNumber, filter))
  }

  renderPaginationControl () {
    const { withPagination, id } = this.props
    const data = withPagination || {
      pageNumber: 1,
      pageSize: 20,
      total: 0
    }
    const { pageNumber, total, pageSize } = data

    let i = 0
    const options = Array(total).fill('').map(n => ({
      label: ++i, value: i
    }))

    const totalPages = Math.ceil(total / pageSize)
    const current = parseInt(pageNumber)
    const prevDisabled = current === 1 ? { disabled: true } : null
    const nextDisabled = current === totalPages ? { disabled: true } : null

    if (total <= 1) return null

    return (
      <PaginationControl>
        <Button dense
          {...prevDisabled}
          page-index={current - 1}
          onClick={this.handleClick}>
          Prev
        </Button>

        <select value={current} options={options} onChange={this.handleSelect} />

        <Button dense
          {...nextDisabled}
          page-index={current + 1}
          onClick={this.handleClick}>
          Next
        </Button>
      </PaginationControl>
    )
  }

  handleClick (e) {
    e.preventDefault()
    const i = parseInt(e.target.getAttribute('page-index'))
    this.loadPagination(i)
  }

  handleSelect (e) {
    this.loadPagination(e.target.value)
  }

  handleKeyDown (e) {
    const pageNumber = parseInt(this.props.pageNumber)
    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault()
        return this.loadPagination(pageNumber - 1)
      case 'ArrowRight':
        e.preventDefault()
        return this.loadPagination(pageNumber + 1)
      default:
        break
    }
  }

  loadPagination (number) {
    const { dispatch, withPagination, filter, id, load, pageSize } = this.props
    const { total, pageNumber } = withPagination
    const totalPages = Math.ceil(parseInt(total) / parseInt(pageSize))

    if (number <= totalPages && number !== pageNumber) {
      dispatch(load(id, pageSize, number, filter))
      this.props.onAfter(number)
    }
  }
}

const PaginationControl = styled('div')`
  display: block;
  margin: 10px auto;
  text-align: center;
`

// container
const mapStateToProps = (state, ownProps) => {
  const { withPagination, entities } = state
  const { id, entityType } = ownProps

  return {
    withPagination: withPagination[id],
    entities: entities[entityType]
  }
}

export default connect(mapStateToProps)(WithPagination)
