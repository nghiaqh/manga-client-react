import styled from '@emotion/styled/macro'
import React from 'react'

const NotFoundMessage = (props) => {
  const textfaces = [
    '( ˚ Δ ˚ ) b',
    '≧☉_☉≦',
    'ರ _ ರ',
    '¯\\(° _ o)/¯',
    '（╯°□°）╯︵ ┻━┻',
    '¯\\_(ツ)_/¯',
    'ಠ_ಠ',
    '⤜(ʘ_ʘ)⤏',
    '└[⨱ロ⨱]┘',
    '乁(/͠-﹏ ͝-\\)ㄏ',
    '⤜(ᗒ﹏ᗕ)⤏',
    'ʕ ᗒ ﹏ ᗕ ʔ',
    'ʕ ᗒ ᨓ ᗕ ʔ',
    '¯\\_(︶︿︶)_/¯',
    '(;｀O´)o',
    '<(｀^´)>',
    '（｀Δ´）！',
    '（▼へ▼メ）',
    'ꉂ `o´ )',
    'ヽ(￣д￣;)ノ',
    'ヽ(｀⌒´)ﾉ',
    'ι(｀ロ´)ノ',
    '(^._.^)ﾉ',
    '~(=^┬ ┬^)',
    '(^=˃ᆺ˂)'
  ]
  const face = textfaces[Math.floor(Math.random() * textfaces.length)]

  return (
    <Box className={`${props.className || ''} not-found-msg`}>
      <div className='not-found-msg__face'>{face}</div>
      <div className='not-found-msg__txt'>No contents found!</div>
    </Box>
  )
}

const Box = styled.div(props => {
  return {
    textAlign: 'center',
    width: 'fit-content',

    '.not-found-msg__face': {
      fontSize: '3em',
      fontWeight: 'bold'
    },

    '.not-found-msg__txt': {
      paddingTop: 5,
      fontSize: '0.8em'
    }
  }
})

export default NotFoundMessage
