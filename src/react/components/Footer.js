import React from 'react'
import { Footer as withState } from 'transactions-interface-state'

import Button from './Button'
import InputButton from './InputButton'

const Footer = ({ siteEmail,
  text,
  onSubscribeClick
}) => {
  return (
    <div className='footer p2 flex flex-wrap items-center justify-center'>
      <div className='footer__contact'>
        <div className='mb1'>
          Email us for further information
        </div>
        <div className='footer__contact__email'>
          {siteEmail}
        </div>
      </div>
      <div className='footer__newsletter'>
        <div className='mb1'>
          Sign up for project updates
        </div>
        <div>
          <InputButton cta='Subscribe'
            placeholder='Your email'
            onClick={onSubscribeClick}
            tag='subscribe' />
        </div>
      </div>
    </div>
  )
}

export default withState(Footer)
