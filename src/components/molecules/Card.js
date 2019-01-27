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
    const { media, title, description, size, onClick } = props

    return (
      <BasicCard className='card--basic' size={size} onClick={onClick}>
        <div className='card__media'>{media}</div>
        <div className='card__meta'>
          <h3 className='card__title'>{title}</h3>
          <div className='card__description'>{description}</div>
        </div>
        <div className='card__overlay' />
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
  const {
    colors,
    padding,
    transition,
    borderRadius,
    boxShadow,
    highlight
  } = props.theme || {}

  return {
    backgroundColor: colors.surface,
    color: colors.onSurface,
    display: 'flex',
    flexFlow: 'column',
    width: width || 'auto',
    height: height || 'auto',
    fontSize: `${height
      ? (height < 200 ? height / 200 : 1) : 1}rem`,
    transition: transition(0.2),
    boxShadow: boxShadow(),
    position: 'relative',
    borderRadius,
    border: `1px solid ${colors.border}`,

    '.card__overlay': {
      position: 'absolute',
      width: '100%',
      height: '100%'
    },

    '&:hover, &:focus': {
      boxShadow: boxShadow('rgba(0,0,0,.5)'),
      '.card__overlay': {
        background: highlight
      }
    },

    '.card__meta': {
      padding: padding / 3,

      '.card__title': {
        fontSize: '1em',
        margin: `0 0 ${padding / 3}px 0`
      },
      '.card__description': {
        fontSize: '0.75em',
        fontWeight: 500
      }
    },

    '.card__media': {
      flexGrow: 1,
      minWidth: 0,
      minHeight: 0,
      display: 'flex',
      flexFlow: 'column',

      img: {
        objectFit: 'cover',
        objectPosition: 'top left',
        minWidth: 0,
        minHeight: 0,
        flexGrow: 1,
        borderRadius: `${borderRadius}px ${borderRadius}px 0 0`,
        borderBottom: `1px solid ${colors.border}`
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
