import classnames from 'classnames'
import React from 'react'
import { HamburgerButton as withState } from 'transactions-interface-state'

import Link from './Link'

const HamburgerButton = ({ isNavigationActive,
  onTopOfDarkSection,
  closeNavigation,
  showNavigation
}) => {
  const classes = classnames({
    'hamburger--active': isNavigationActive,
    'hamburger--on-dark-bg': onTopOfDarkSection
  }, 'hamburger')
  return (
    <Link
      href='#footer'
      className={classes}
      onClick={e => {
        e.preventDefault()
        if (!isNavigationActive) {
          showNavigation()
        } else {
          // For keyboard users.
          // Not used for mouseclicks, instead we capture clicks via dismiss overlay
          closeNavigation()
        }
      }}
    >
      <div className='hamburger-box'>
        <div className='hamburger-inner'>
        </div>
      </div>
    </Link>
  )
}

export default withState(HamburgerButton)
