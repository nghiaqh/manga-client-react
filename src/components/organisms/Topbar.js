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

const Header = styled.header(props => {
  const { colors, padding, topBarHeight, transition } = props.theme

  return {
    backgroundColor: colors.primary,
    color: colors.onPrimary,
    height: topBarHeight,
    boxSizing: 'border-box',
    zIndex: 1,

    '#topbar': {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: `0 ${padding}px`,
      borderBottom: `1px solid ${colors.border}`,

      '> a': {
        fontWeight: 600
      }
    },

    a: {
      color: colors.onPrimary,
      textDecoration: 'none'
    },

    '#topbar--menu-btn': {
      float: 'right'
    },

    '#settings-menu': {
      marginTop: 5,
      float: 'right',
      minWidth: 200,
      background: colors.primary,
      color: colors.onPrimary,
      border: `1px solid ${colors.border}`,
      transition: transition(0.2),
      visibility: 'visible',
      opacity: 1,
      boxShadow: props.theme.boxShadow(),
      zIndex: 2,

      '&.hidden': {
        visibility: 'hidden',
        opacity: 0
      }
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Topbar)
