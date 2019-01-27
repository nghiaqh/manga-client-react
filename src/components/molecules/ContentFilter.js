import styled from '@emotion/styled/macro'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { setContentFilter } from 'redux/actions/appSettings'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ContentFilter extends PureComponent {
  constructor (props) {
    super(props)
    this.toggleNSFW = this.toggleNSFW.bind(this)
  }

  render () {
    return (
      <Container>
        <div>Content options</div>
        <div className='content-setting'
          onClick={this.toggleNSFW}>
          <label htmlFor='nsfw-checkbox'>
            NSFW
          </label>

          { this.props.contentFilter.includeNSFW
            ? <FontAwesomeIcon icon='eye' size='lg' />
            : <FontAwesomeIcon icon='eye-slash' size='lg' />
          }
        </div>
      </Container>
    )
  }

  toggleNSFW (event) {
    this.props.dispatch(setContentFilter({
      includeNSFW: !this.props.contentFilter.includeNSFW
    }))
  }
}

const Container = styled.div(props => {
  const { padding, highlight } = props.theme
  return {
    padding: padding,
    textTransform: 'capitalize',

    '> div:first-of-type': {
      marginBottom: padding / 2,
      fontSize: '1.2em',
      fontWeight: 600
    },

    '.content-setting': {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingTop: padding / 4,
      paddingBottom: padding / 4,
      cursor: 'pointer',

      '&:hover, &:focus, &:active': {
        background: highlight
      },

      label: {
        cursor: 'pointer'
      }
    }
  }
})

const mapStateToProps = (state) => {
  return {
    contentFilter: state.contentFilter
  }
}

export default connect(mapStateToProps)(ContentFilter)
