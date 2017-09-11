import classnames from 'classnames'
import React, { Component } from 'react'
import { connect } from 'react-redux'

import Avatar from './Avatar'
import BellButton from './BellButton'
import Button from './Button'
import Icon from './Icon'
import HamburgerButton from './HamburgerButton'
import Link from './Link'
import Logo from './Logo'
import Navigation from './Navigation'

const withoutSigninPaths = ['/signin', '/signup']

class Header extends Component {
  constructor () {
    super ()
    this.state = { visibleLinks: null }
    this.handleFilterVisibleLinks = this._handleSetVisibleLinks.bind(this)
  }
  componentWillMount() {
    this.handleFilterVisibleLinks(this.props)
  }
  componentWillReceiveProps (nextProps) {
    this.handleFilterVisibleLinks(nextProps)
  }
  _handleSetVisibleLinks (props) {
    const { menuLinks } = props
    menuLinks && this.setState({ visibleLinks: menuLinks.filter(({ getIsVisible }) =>
      !getIsVisible || getIsVisible(props)
    )})
  }
  render () {
    const { active,
      firstName,
      id,
      imageUrl,
      isSigninPage,
      LogoutLinkComponent,
      menuLinks,
      pathname,
      siteName
    } = this.props
    const { visibleLinks } = this.state
    return (
      <div className='header flex justify-start items-center'>
        <Navigation
          LogoutLinkComponent={LogoutLinkComponent}
          visibleLinks={visibleLinks}
        />
        <Link className='header__link flex justify-start items-center' href='/home'>
          <div>
            <Logo />
          </div>
          <div className='header__link__title'>
            { siteName }
          </div>
        </Link>
        <div className='header__empty flex-auto' />
        {
          visibleLinks && visibleLinks.map(({ label, path }, index) => {
            console.log('path === pathname', path === pathname)
            return (
              <div className='header__navigation' key={index} >
                {
                  path === pathname
                  ? (
                    <div className='header__navigation__item header__navigation__item--active'>
                      {label}
                    </div>
                  )
                  : (
                    <Link className='header__navigation__item'
                      href={path}
                    >
                      {label}
                    </Link>
                  )
                }
              </div>
            )
          })
        }
        <div className={classnames('header__navigation', {
          'header__navigation--no-border': !firstName
        })}>
          {
            !firstName && !isSigninPage && (
              <Button
                className={`button button--alive button--cta`}
                href='/signin'>
                  Sign In
              </Button>
            )
          }
        </div>
        {
          firstName && (
            <div className='header__navigation header__navigation--name'>
              <Link
                className={classnames('header__navigation__item', {
                  'header__navigation__item--active': pathname === '/account'
                })}
                href='/account'
              >
                {firstName}
              </Link>
              {
                !active && (
                  <svg className='header__navigation__alert'>
                    <circle className='header__navigation__alert__circle' />
                  </svg>
                )
              }
            </div>
          )
        }
        <div className='header__avatar'>
          <Avatar
            className='avatar header__avatar__img'
            id={id}
          />
        </div>
        {
          id && (<div className='header__bell'>
            <BellButton />
          </div>)
        }
        <div className='header__hamburger'>
          <HamburgerButton />
        </div>
      </div>
    )
  }
}

Header.defaultProps = {
  menuLinks: [],
  siteName: 'Transactions'
}

function mapStateToProps ({ authorization,
  router: { location: { pathname } },
  user
}) {
  const newState = { isSigninPage: withoutSigninPaths.includes(pathname),
    pathname
  }
  if (authorization) {
    const { visibleModes } = authorization
    Object.assign(newState, { visibleModes })
  }
  if (user) {
    const { active,
      firstName,
      id,
      imageUrl
    } = user
    Object.assign(newState, { active,
      firstName,
      id,
      imageUrl
    })
  }
  return newState
}
export default connect(mapStateToProps)(Header)
