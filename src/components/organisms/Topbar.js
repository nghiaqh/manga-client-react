import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

class Topbar extends PureComponent {
  render () {
    return (
      <nav id='topbar'>
        <span>Topbar</span>
        <Link className='topbar--nav' to='/'>Manga Reader</Link>
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
