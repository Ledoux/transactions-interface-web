import PropTypes from 'prop-types'
import React from 'react'

import Link from './Link'

// prevent creating new function every time default prop onClick is required
const noop = () => {}

const Button = ({ children,
  className,
  disabled,
  download,
  href,
  id,
  onClick,
  onMouseDown,
  onMouseOver,
  target,
  type
}) => {
  const classes = className || 'button'
  if (href) {
    return (<Link
      className={classes}
      id={id}
      download={download}
      href={href}
      target={target}
      onClick={onClick}
      >
      {children}
    </Link>)
  }
  return (
    <button
      className={classes}
      disabled={disabled}
      download={download}
      id={id}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      type={type}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  href: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  target: PropTypes.string,
  type: PropTypes.string
}

Button.defaultProps = {
  onClick: noop
}

export default Button
