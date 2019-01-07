import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ThemePicker from 'components/molecules/ThemePicker'

class Topbar extends PureComponent {
  render () {
    return (
      <nav id='sidebar'>
        <p>Sidebar</p>
        <div className='sidebar--nav'>
          <Link to='/'>Manga Reader</Link>
        </div>
        <ThemePicker />
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Topbar)
