import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class ListItem extends PureComponent {
  render () {
    return (
      <div className='list__item--basic'>{this.props.children}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

export default connect(mapStateToProps)(ListItem)
