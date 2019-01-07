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
      <>
        <input
          type='checkbox'
          onChange={this.setTheme}
          checked={this.props.currentTheme === 'dark'}
        />
        <label>Dark theme</label>
      </>
    )
  }

  setTheme (event) {
    const theme = event.currentTarget.checked ? 'dark' : 'light'
    this.props.dispatch(setTheme(theme))
  }
}

const mapStateToProps = (state) => {
  return {
    style: state.style,
    currentTheme: state.theme
  }
}

export default connect(mapStateToProps)(ThemePicker)
