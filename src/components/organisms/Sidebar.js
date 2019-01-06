import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Topbar extends PureComponent {
  render () {
    return (
      <nav id='sidebar'>
        <p>Sidebar</p>
        <Link className='sidebar--nav' to='/'>Manga Reader</Link>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    theme: state.theme,
    style: state.style
  }
}

export default connect(mapStateToProps)(Topbar)
