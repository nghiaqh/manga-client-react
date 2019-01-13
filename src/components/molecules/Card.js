import styled from '@emotion/styled/macro'
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
      <BasicCard className='card--basic'>
        <div className='card__media'>{media}</div>
        <div className='card__title'>{title}</div>
        <div className='card__description'>{description}</div>
      </BasicCard>
    )
  }

  renderMaterialVersion (props) {
    const { media, title, description } = props
    return (
      <div className='card--material'>
        <div className='card__media'>{media}</div>
        <div className='card__title'>{title}</div>
        <div className='card__description'>{description}</div>
      </div>
    )
  }
}

const BasicCard = styled.div(props => ({
  backgroundColor: props.theme.colors.surface,
  color: props.theme.colors.onSurface,
  padding: props.theme.padding / 4,
  '.card__title': {
    fontSize: '1rem',
    margin: 8
  },
  '.card__description': {
    fontSize: '0.75rem',
    margin: 8
  }
}))

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Card)
