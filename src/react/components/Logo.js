import classnames from 'classnames'
import PropTypes from 'prop-types'
import React from 'react'

const Logo = ({ onTopOfDarkSection }) => {
  const classes = classnames({ 'logo--on-dark-bg': onTopOfDarkSection
  }, 'logo icon')
  return (
    <img src='/static/images/logo.png' className={classes} />
  )
}

Logo.propTypes = { onTopOfDarkSection: PropTypes.bool }

export default Logo
