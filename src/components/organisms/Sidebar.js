/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux'
import ThemePicker from 'components/molecules/ThemePicker'

class Topbar extends React.PureComponent {
  render () {
    return (
      <nav id='sidebar' css={theme => ({ padding: theme.padding / 2 })}>
        <ThemePicker />
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Topbar)
