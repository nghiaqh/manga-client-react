import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'components/atoms/Button'

class Topbar extends PureComponent {
  render () {
    return (
      <BasicNav id='topbar'>
        <Link className='topbar--nav' to='/'>Manga Reader</Link>
        <Button id='topbar--menu-btn' onClick={this.props.toggleSidebar}>
          Sidebar
        </Button>
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
  },

  '#topbar--menu-btn': {
    float: 'right'
  }
}))

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Topbar)
