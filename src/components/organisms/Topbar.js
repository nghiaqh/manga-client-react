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
      showSettings: false,
      showSearch: false
    }

    this.toggleSettings = this.toggleSettings.bind(this)
    this.toggleSearch = this.toggleSearch.bind(this)
  }

  render () {
    const { showSearch, showSettings } = this.state

    return (
      <Header>
        <div id='topbar'>
          <Link className='topbar--logo' to='/'>Manga Reader</Link>

          <div id='topbar--menu'>
            <Button id='topbar--menu-btn' onClick={this.toggleSearch}>
              Search
            </Button>
            <Button id='topbar--menu-btn' onClick={this.toggleSettings}>
              Settings
            </Button>
          </div>
        </div>

        <div id='settings-menu' className={showSettings ? 'visible' : 'hidden'}>
          <ThemePicker />
        </div>

        <Search
          visible={showSearch}
          toggleSearch={this.toggleSearch}
          location={this.props.location} />
      </Header>
    )
  }

  toggleSettings () {
    this.setState(state => ({ showSettings: !state.showSettings }))
  }

  toggleSearch (open) {
    this.setState(state => ({
      showSearch: open !== undefined ? open : !state.showSearch
    }))
  }
}

const Header = styled.header(props => {
  const { colors, padding, topBarHeight, transition } = props.theme

  return {
    zIndex: 1,
    marginBottom: topBarHeight,

    '#topbar': {
      position: 'fixed',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.primaryDark,
      color: colors.onPrimaryDark,
      height: topBarHeight,
      width: '100%',
      boxSizing: 'border-box',
      padding: `0 ${padding}px`,
      borderBottom: `1px solid ${colors.border}`,

      '> a': {
        fontWeight: 600,
        color: colors.onPrimaryDark,
        textDecoration: 'none'
      },

      '#topbar--menu-btn': {
      }
    },

    '#settings-menu': {
      position: 'absolute',
      top: topBarHeight,
      right: 0,
      float: 'right',
      marginTop: 5,
      minWidth: 200,
      background: colors.primary,
      color: colors.onPrimary,
      border: `1px solid ${colors.border}`,
      boxShadow: props.theme.boxShadow(),
      transition: transition(0.2),
      visibility: 'visible',
      opacity: 1,

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
