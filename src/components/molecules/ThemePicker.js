import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setTheme } from 'redux/actions/style'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import themes from 'libs/themes'

class ThemePicker extends PureComponent {
  constructor (props) {
    super(props)
    this.themes = Object.keys(themes)
    this.setTheme = this.setTheme.bind(this)
  }

  render () {
    const list = this.themes.map(theme => {
      const enabled = this.props.currentTheme === theme ? 'enabled' : ''

      return (
        <div className={`theme-item`} key={theme}
          data-theme={theme}
          onClick={this.setTheme}>
          <label>{theme}</label>
          <Theme colors={themes[theme].colors}>
            <span className='color--primary' />
            <span className='color--secondary' />
            <span className='color--background' />
          </Theme>
          <FontAwesomeIcon className={enabled} icon='check' size='lg' />
        </div>
      )
    })

    return (
      <Container>
        <div>Themes</div>
        {list}
      </Container>
    )
  }

  setTheme (event) {
    const theme = event.currentTarget.getAttribute('data-theme')
    this.props.dispatch(setTheme(theme))
  }
}

const Container = styled.div(props => {
  const { padding, highlight } = props.theme
  return {
    padding: padding,
    textTransform: 'capitalize',

    '> div:first-of-type': {
      marginBottom: padding / 2,
      fontSize: '1.2em',
      fontWeight: 600
    },

    '.theme-item': {
      display: 'flex',
      alignItems: 'center',
      paddingTop: padding / 4,
      paddingBottom: padding / 4,
      cursor: 'pointer',

      '&:hover, &:focus, &:active': {
        background: highlight
      },

      '.fa-check': {
        opacity: 0,
        marginLeft: padding,

        '&.enabled': {
          opacity: 1
        }
      },

      label: {
        cursor: 'pointer',
        marginRight: padding,
        flexGrow: 1
      },

      '> div': {
        height: padding * 1.5 + 4
      },

      span: {
        width: padding * 1.5,
        height: padding * 1.5,
        display: 'inline-block',
        marginLeft: padding / 4,
        border: '1px solid'
      }
    }
  }
})

const Theme = styled.div(props => {
  const { colors } = props

  return {
    span: {
      borderColor: colors.border
    },

    '.color--primary': {
      background: colors.primary
    },

    '.color--secondary': {
      background: colors.secondary
    },

    '.color--background': {
      background: colors.background
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style,
    currentTheme: state.theme
  }
}

export default connect(mapStateToProps)(ThemePicker)
