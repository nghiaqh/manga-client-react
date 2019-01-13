/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { connect } from 'react-redux'
import { getImageUrl } from 'libs/apiRoutes'

class Image extends React.PureComponent {
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
      <img className='image--basic'
        alt={props.title}
        src={getImageUrl(props.src)}
        css={imgCss}
      />
    )
  }

  renderMaterialVersion (props) {
    return (
      <img className='iamge--material'
        alt={props.title}
        src={getImageUrl(props.src)} />
    )
  }
}

const imgCss = {
  height: '100%'
}

const mapStateToProps = (state) => {
  return {
    style: state.style
  }
}

export default connect(mapStateToProps)(Image)
