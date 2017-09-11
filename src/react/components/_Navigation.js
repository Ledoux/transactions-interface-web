
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { closeNavigation } from 'transactions-interface-state'

import Button from './Button'
import Link from './Link'

class Navigation extends Component {
  componentDidUpdate (prevProps) {
    const { closeNavigation,
      isActive,
      pathname
    } = this.props
    if (isActive && prevProps.pathname !== pathname) {
      closeNavigation()
    }
  }
  render () {
    const { activePathname,
      closeNavigation,
      closeModal,
      email,
      isActive,
      LogoutLinkComponent,
      pathname,
      showModal,
      visibleLinks
    } = this.props
    const classes = classnames({
      'navigation--showing': isActive
    }, 'navigation')
    return (
      <div className={classes} onClick={closeNavigation}>
        <nav className='navigation__list px2 py1' onClick={e => {
          e.nativeEvent.stopImmediatePropagation() // Prevent click bubbling and closing modal
          e.stopPropagation()
        }}>
          {
            visibleLinks.map(({ external,
              label,
              target,
              path
              }, idx) => {
                return (
                  <div
                    className='navigation__list__item'
                    key={idx}
                  >
                    {
                      path === pathname
                      ? (
                        <div className='navigation__list__item__link navigation__list__item__link--active'>
                          {label}
                        </div>
                      )
                      : (
                        <Link className='block py2 navigation__list__item__link'
                          external={external}
                          href={path}
                          target={target}
                        >
                          {label}
                        </Link>
                      )
                    }
                  </div>
                )
            })
          }
          {
            email && LogoutLinkComponent && (<div
            className='navigation__list__item-container'
            key={visibleLinks.length + 1}
            >
              <LogoutLinkComponent
                afterShowModal={closeNavigation}
                className='logout-link navigation__list__item__link'
              />
            </div>)
          }
        </nav>
      </div>
    )
  }
}

Navigation.propTypes = { closeNavigation: PropTypes.func.isRequired,
  activePathname: PropTypes.string
}

const mapStateToProps = ({ navigation: { isActive },
  router: { location: { pathname } },
  user: { email }
}) => {
  return { email,
    isActive,
    pathname
  }
}
export default connect(mapStateToProps, { closeNavigation })(Navigation)
