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
    display: 'flex',
    flexDirection: 'column',

    aside: {
      backgroundColor: props.theme.colors.surface,
      color: props.theme.colors.onSurface
    },
    main: {
      backgroundColor: props.theme.colors.background,
      color: props.theme.colors.onBackground
    },

    [`@media (min-width: ${props.theme.breakpoints[1]}px)`]: {
      flexDirection: 'row-reverse',
      aside: { width: 220 },
      main: { width: `calc(100% - 220px)` }
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Composition)
