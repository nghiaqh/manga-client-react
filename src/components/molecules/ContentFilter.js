import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setContentFilter } from 'redux/actions/appSettings'

class ContentFilter extends PureComponent {
  constructor (props) {
    super(props)
    this.toggleNSFW = this.toggleNSFW.bind(this)
  }

  render () {
    return (
      <Box>
        <label htmlFor='nsfw-checkbox'>
          NSFW Content
        </label>
        <input
          type='checkbox'
          id='nsfw-checkbox'
          name='nsfw-checkbox'
          checked={this.props.contentFilter.includeNSFW}
          onChange={this.toggleNSFW}
        />
      </Box>
    )
  }

  toggleNSFW (event) {
    this.props.dispatch(setContentFilter({
      includeNSFW: event.currentTarget.checked
    }))
  }
}

const Box = styled.div(props => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    padding: props.theme.padding,

    label: {
      cursor: 'pointer',
      userSelect: 'none'
    },

    'input[type=checkbox]': {
      cursor: 'pointer'
    }
  }
})

const mapStateToProps = (state) => {
  return {
    contentFilter: state.contentFilter
  }
}

export default connect(mapStateToProps)(ContentFilter)
