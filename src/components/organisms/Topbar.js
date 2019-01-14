import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Topbar extends PureComponent {
  render () {
    return (
      <BasicNav id='topbar'>
        <Link className='topbar--nav' to='/'>Manga Reader</Link>
      </BasicNav>
    )
  }
}

const BasicNav = styled.nav(props => ({
  backgroundColor: props.theme.colors.primary,
  color: props.theme.colors.onPrimary,
  padding: props.theme.padding,
  height: 64,
  boxSizing: 'border-box',

  a: {
    color: props.theme.colors.onPrimary,
    textDecoration: 'none'
  }
}))

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Topbar)
