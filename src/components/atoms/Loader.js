import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import styled from '@emotion/styled/macro'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class Loader extends PureComponent {
  render () {
    return (
      <Spinner className='loader--basic'>
        {/* Loading... */}
        <FontAwesomeIcon icon='spinner' size='2x' />
      </Spinner>
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
    fontWeight: 600,
    svg: {
      animationIterationCount: 'infinite',
      animationName: 'spin',
      animationDuration: '2s'
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Loader)
