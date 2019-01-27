import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled/macro'

class Loader extends PureComponent {
  render () {
    switch (this.props.style) {
      case 'material':
        return this.renderMaterialVersion(this.props)
      default:
        return this.renderBasicVersion(this.props)
    }
  }

  renderBasicVersion (props) {
    return (
      <Spinner className='loader--basic'>
        Loading...
      </Spinner>
    )
  }

  renderMaterialVersion (props) {
    return (
      <span className='loader--material'>Loading...</span>
    )
  }
}

const Spinner = styled.div(props => {
  const { colors, padding } = props.theme
  return {
    color: colors.secondaryDark,
    margin: padding,
    display: 'block',
    textAlign: 'center',
    fontWeight: 600
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Loader)
