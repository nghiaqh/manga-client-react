import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
            <Button className='topbar--menu-btn icon icon-search'
              onClick={this.toggleSearch}
              title='Search'>
              <FontAwesomeIcon icon='search' size='2x' />
            </Button>
            <Button className='topbar--menu-btn icon icon-settings'
              onClick={this.toggleSettings}
              title='Settings'>
              <FontAwesomeIcon icon='cog' size='2x' />
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
  const { colors, padding, topBarHeight, transition, boxShadow } = props.theme

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
      fontSize: '1.2em',
      height: topBarHeight,
      width: '100%',
      boxSizing: 'border-box',
      padding: `0 ${padding}px`,
      borderBottom: `1px solid ${colors.border}`,
      boxShadow: boxShadow('rgba(0,0,0,0.3)'),

      '> a': {
        fontWeight: 600,
        color: colors.onPrimaryDark,
        textDecoration: 'none'
      },

      button: {
        marginLeft: padding
      }
    },

    '#settings-menu': {
      position: 'fixed',
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
