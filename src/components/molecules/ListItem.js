import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class ListItem extends PureComponent {
  render () {
    switch (this.props.style) {
      case 'material':
        return this.renderMaterialVersion(this.props)
      default:
        return this.renderBasicVersion(this.props)
    }
  }

  renderBasicVersion (props) {
    return (
      <div className='list__item--basic'>{props.children}</div>
    )
  }

  renderMaterialVersion (props) {
    return (
      <div className='list__item--material'>{props.children}</div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(ListItem)
