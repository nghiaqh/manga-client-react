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
    const { media, title, description, size } = props
    return (
      <BasicCard className='card--basic' size={size} >
        <div className='card__title'>{title}</div>
        <div className='card__description'>{description}</div>
        <div className='card__media'>{media}</div>
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

const BasicCard = styled.div(props => {
  const { width, height } = props.size || {}
  const { colors, padding } = props.theme || {}
  return {
    backgroundColor: colors.surface,
    color: colors.onSurface,
    padding: padding / 4,
    display: 'flex',
    flexFlow: 'column',
    width: width || 'auto',
    height: height || 'auto',

    '.card__title': {
      fontSize: `${height
        ? (height < 300 ? height / 300 : 1) : 1}rem`
    },
    '.card__description': {
      fontSize: `${height
        ? (height < 300 ? height * 0.9 / 300 : 0.9) : 0.9}rem`,
      marginBottom: padding / 4
    },
    '.card__media': {
      flexGrow: 1,
      minWidth: 0,
      minHeight: 0,
      display: 'flex',
      flexFlow: 'column',

      img: {
        objectFit: 'cover',
        objectPosition: 'top',
        minWidth: 0,
        minHeight: 0
      }
    }
  }
})

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Card)
