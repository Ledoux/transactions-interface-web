import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
const { closeNavigation,
  showNavigation
} = require('transactions-interface-state').default

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

HamburgerButton.propTypes = {
  closeNavigation: PropTypes.func.isRequired,
  isNavigationActive: PropTypes.bool.isRequired,
  onTopOfDarkSection: PropTypes.bool,
  showNavigation: PropTypes.func.isRequired
}

const mapStateToProps = ({
  navigation: {
    isActive
  }
}) => {
  return {
    isNavigationActive: isActive
  }
}
export default connect(mapStateToProps, {
  closeNavigation,
  showNavigation
})(HamburgerButton)
