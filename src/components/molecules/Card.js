import React, { PureComponent } from 'react'
import { connect } from 'react-redux'

class Card extends PureComponent {
  render () {
    switch (this.props.style) {
      case 'material':
        return this.renderMaterialVersion(this.props)
      default:
        return this.renderBasicVersion(this.props)
    }
  }

  renderBasicVersion (props) {
    const { media, title, description } = props
    return (
      <div className='card--basic'>
        <div className='card__media'>{media}</div>
        <div className='card__title'>{title}</div>
        <div className='card__title'>{description}</div>
      </div>
    )
  }

  renderMaterialVersion (props) {
    const { media, title, description } = props
    return (
      <div className='card--material'>
        <div className='card__media'>{media}</div>
        <div className='card__title'>{title}</div>
        <div className='card__title'>{description}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Card)
