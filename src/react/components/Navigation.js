import PropTypes from 'prop-types'
import React from 'react'
import classnames from 'classnames'
import { connect } from 'react-redux'
import { closeNavigation } from 'transactions-interface-state'

import Button from './Button'
import Link from './Link'

const Navigation = ({ activePathname,
  closeNavigation,
  closeModal,
  email,
  isActive,
  LogoutLinkComponent,
  visibleLinks,
  showModal
}) => {
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
                <Link
                  className={classnames({
                    'navigation__list__item__link--active': path === window.location.pathname,
                  }, 'block py2 navigation__list__item__link')}
                  external={external}
                  href={path}
                  target={target}
                >
                  {label}
                </Link>
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

Navigation.propTypes = { closeNavigation: PropTypes.func.isRequired,
  activePathname: PropTypes.string
}

const mapStateToProps = ({ authorization: { links },
  navigation: { isActive },
  user: { email }
}) => {
  return { email,
    isActive,
    visibleLinks: (links && links.filter(link => link.label)) || []
  }
}
export default connect(mapStateToProps, { closeNavigation })(Navigation)
