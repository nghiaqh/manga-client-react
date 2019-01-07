import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Composition extends PureComponent {
  render () {
    return (
      <Section cols={this.props.cols}>
        {this.props.children}
      </Section>
    )
  }
}

const Section = styled.section(props => {
  return {
    height: 'calc(100vh - 64px)',
    aside: {
      minWidth: 260,
      float: 'right',
      height: '100%',
      backgroundColor: props.theme.colors.surface,
      color: props.theme.colors.onSurface
    },
    main: {
      display: 'inline-block',
      maxWidth: `calc(100% - 260px)`,
      height: '100%',
      backgroundColor: props.theme.colors.background,
      color: props.theme.colors.onBackground
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Composition)
