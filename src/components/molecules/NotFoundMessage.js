import React from 'react'
import { Typography } from 'components/atoms/Typography'

const NotFoundMessage = (props) => {
  const textfaces = [
    '( ˚ Δ ˚ ) b',
    '≧ ☉ _ ☉ ≦',
    'ರ _ ರ',
    '¯\\ ( ° _ o ) /¯',
    '（╯°□°）╯︵ ┻━┻',
    '¯\\_(ツ)_/¯',
    'ಠ_ಠ',
    '⤜(ʘ_ʘ)⤏',
    '└[⨱ロ⨱]┘',
    '乁(/͠-﹏ ͝-\\)ㄏ',
    '⤜(ᗒ﹏ᗕ)⤏',
    'ʕ ᗒ ﹏ ᗕ ʔ',
    'ʕ ᗒ ᨓ ᗕ ʔ',
    '¯\\_( ︶︿︶)_/¯',
    '(;｀O´)o',
    '<(｀^´)>',
    '（｀Δ´）！',
    '（▼へ▼メ）',
    'ꉂ `o´ )',
    'ヽ(￣д￣;)ノ',
    'ヽ(｀⌒´)ﾉ',
    'ι(｀ロ´)ノ',
    'щ(ºДºщ)',
    '⁽͑˙˚̀⚐˚́˙⁾̉',
    'ฅ⁽͑ ˚̀ ˙̭ ˚́ ⁾̉ฅ',
    '(^._.^)ﾉ',
    '~(=^┬ ┬^)',
    '(^=˃ᆺ˂)'
  ]
  const face = textfaces[Math.floor(Math.random() * textfaces.length)]

  return (
    <div className='text-center'>
      <br /><br />
      <Typography use='headline4'>{face}</Typography>
      <br /><br />
      <Typography use='subtitle2'>No contents found!</Typography>
    </div>
  )
}

export default NotFoundMessage
