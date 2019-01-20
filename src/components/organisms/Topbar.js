import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Button from 'components/atoms/Button'
import ThemePicker from 'components/molecules/ThemePicker'
import Search from 'components/organisms/Search'

class Topbar extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      showSettings: false
    }

    this.toggleSettings = this.toggleSettings.bind(this)
  }

  render () {
    return (
      <Header>
        <div id='topbar'>
          <Link className='topbar--nav' to='/'>Manga Reader</Link>
          <Search location={this.props.location} />
          <Button id='topbar--menu-btn' onClick={this.toggleSettings}>
            Settings
          </Button>
        </div>

        <div id='settings-menu'
          className={this.state.showSettings ? 'visible' : 'hidden'}>
          <ThemePicker />
        </div>
      </Header>
    )
  }

  toggleSettings () {
    this.setState(state => ({ showSettings: !state.showSettings }))
  }
}

const Header = styled.header(props => ({
  backgroundColor: props.theme.colors.primary,
  color: props.theme.colors.onPrimary,
  padding: `0 ${props.theme.padding}px`,
  height: props.theme.topBarHeight,
  boxSizing: 'border-box',

  '#topbar': {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  a: {
    color: props.theme.colors.onPrimary,
    textDecoration: 'none'
  },

  '#topbar--menu-btn': {
    float: 'right',
    cursor: 'pointer'
  },

  '#settings-menu': {
    position: 'absolute',
    right: props.theme.padding,
    top: props.theme.topBarHeight,
    padding: props.theme.padding,
    backgroundColor: props.theme.colors.primary,
    color: props.theme.colors.onPrimary,
    zIndex: 100,

    '&.hidden': {
      display: 'none'
    }
  }
}))

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Topbar)
