import React from 'react'
import { EmblemLink as withState } from 'transactions-interface-state'

import Link from './Link'
import Logo from './Logo'

const EmblemLink = ({ siteLabel }) => {
  return (
    <Link className='emblem-link flex justify-start items-center' href='/home'>
      <div className='emblem-link__logo'>
        <Logo />
      </div>
      <div className='emblem-link__title'>
        { siteLabel }
      </div>
    </Link>
  )
}

export default withState(EmblemLink)
