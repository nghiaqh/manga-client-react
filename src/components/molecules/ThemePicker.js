import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setTheme } from 'redux/actions/style'

class ThemePicker extends PureComponent {
  constructor (props) {
    super(props)
    this.setTheme = this.setTheme.bind(this)
  }

  render () {
    return (
      <Box>
        <input
          type='checkbox'
          id='night-mode-checkbox'
          name='night-mode-checkbox'
          onChange={this.setTheme}
          checked={this.props.currentTheme === 'dark'}
        />
        <label htmlFor='night-mode-checkbox'>
          Night mode
        </label>
      </Box>
    )
  }

  setTheme (event) {
    const theme = event.currentTarget.checked ? 'dark' : 'light'
    this.props.dispatch(setTheme(theme))
  }
}

const Box = styled.div(props => {
  return {
    display: 'flex',
    justifyContent: 'space-between',
    padding: props.theme.padding,

    label: {
      cursor: 'pointer',
      userSelect: 'none'
    },

    'input[type=checkbox]': {
      cursor: 'pointer'
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
