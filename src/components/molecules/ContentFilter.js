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
          NSFW
        </label>
        <input
          type='checkbox'
          id='nsfw-checkbox'
          name='nsfw-checkbox'
          onChange={this.toggleNSFW}
        />
      </Box>
    )
  }

  toggleNSFW (event) {
    const nsfw = event.currentTarget.checked
    this.props.dispatch(setContentFilter({ nsfw }))
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
