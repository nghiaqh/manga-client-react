/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux'
import ThemePicker from 'components/molecules/ThemePicker'

class Sidebar extends React.PureComponent {
  render () {
    return (
      <aside
        id={this.props.id}
        className={this.props.display ? 'visible' : 'hidden'}
        css={theme => ({ padding: theme.padding / 2 })}>
        <nav>
          <ThemePicker />
        </nav>
      </aside>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Sidebar)
