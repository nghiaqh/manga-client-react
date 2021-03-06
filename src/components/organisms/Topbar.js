import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ThemePicker from 'components/molecules/ThemePicker'
import Search from 'components/organisms/Search'
import ContentFilter from 'components/molecules/ContentFilter'
import Button from 'components/atoms/Button'

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
            <Button className='btn--plain'
              onClick={this.toggleSearch}
              title='Search'
              ariaHasPopUp
              ariaControls='search-overlay'
              ariaLabelledBy='search-overlay'>
              <FontAwesomeIcon icon='search' size='lg' />
            </Button>
            <Button className='btn--plain'
              onClick={this.toggleSettings}
              title='Settings'
              ariaHasPopUp
              ariaControls='settings-menu'
              ariaLabelledBy='settings-menu'>
              <FontAwesomeIcon icon='cog' size='lg' />
            </Button>
          </div>
        </div>

        <div id='settings-menu' className={showSettings ? 'visible' : 'hidden'}>
          <div>
            <ThemePicker />
            <ContentFilter />
          </div>
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
  const {
    colors,
    padding,
    topBarHeight,
    transition,
    boxShadow,
    borderRadius
  } = props.theme

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
      }
    },

    '#topbar--menu': {
      button: {
        marginLeft: padding,
        color: colors.onPrimaryDark
      }
    },

    '#settings-menu': {
      position: 'fixed',
      top: topBarHeight,
      right: padding / 4,
      float: 'right',
      marginTop: padding / 2,
      background: colors.primary,
      color: colors.onPrimary,
      border: `1px solid ${colors.border}`,
      borderRadius,
      boxShadow: props.theme.boxShadow(),
      transition: transition(0.2),
      visibility: 'visible',
      opacity: 1,

      '&.hidden': {
        visibility: 'hidden',
        opacity: 0
      },

      '> div:first-of-type': {
        maxHeight: `calc(100vh - ${topBarHeight}px)`,
        minWidth: 200,
        overflow: 'auto'
      },

      '&:before, &:after': {
        display: 'block',
        position: 'absolute',
        bottom: '100%',
        border: 'solid transparent',
        content: `" "`,
        width: 0,
        height: 0,
        transition: transition(0.2),
        pointerEvents: 'none'
      },

      '&:after': {
        right: padding + 1,
        borderBottomColor: colors.primary,
        borderWidth: padding / 2,
        marginLeft: 0 - padding / 2
      },

      '&:before': {
        right: padding,
        borderBottomColor: colors.border,
        borderWidth: padding / 2 + 1,
        marginLeft: 0 - padding / 2 - 1
      },

      label: {
        fontSize: '0.9em'
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
