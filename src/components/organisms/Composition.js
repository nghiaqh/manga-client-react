import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Composition extends PureComponent {
  render () {
    return (
      <Layout cols={this.props.cols}>
        {this.props.children}
      </Layout>
    )
  }
}

const Layout = styled.div(props => {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    maxWidth: '100%',

    aside: {
      backgroundColor: props.theme.colors.surface,
      color: props.theme.colors.onSurface,
      boxSizing: 'border-box',

      '&.hidden': {
        display: 'none'
      }
    },
    main: {
      backgroundColor: props.theme.colors.background,
      color: props.theme.colors.onBackground,
      width: '100%',
      minWidth: 0
    },

    [`@media (min-width: ${props.theme.breakpoints[1]}px)`]: {
      flexDirection: 'row',
      aside: {
        width: 220,
        flexShrink: 0
      }
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Composition)
