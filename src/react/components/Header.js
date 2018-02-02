import classnames from 'classnames'
import React from 'react'
import { Header as withState } from 'transactions-interface-state'
import { LogoutLink } from 'transactions-user-web'

import Avatar from './Avatar'
import BellButton from './BellButton'
import Button from './Button'
import EmblemLink from './EmblemLink'
import Icon from './Icon'
import Go from './Go'
import HamburgerButton from './HamburgerButton'
import Link from './Link'
import Navigation from './Navigation'

const Header = ({ active,
  children,
  firstName,
  id,
  imageUrl,
  isSign,
  isSigninPage,
  LogoutLinkComponent,
  menuLinks,
  pageName,
  pathname,
  visibleLinks
}) => {
  return (
    <div className={`header header--${pageName} flex justify-start items-center`}>
      <Navigation LogoutLinkComponent={LogoutLinkComponent}
        visibleLinks={visibleLinks} />
      <EmblemLink />
      <div className='header__left flex items-center' />
      <div className='header__empty flex-auto' />
      {
        visibleLinks && visibleLinks.map(({ label, path }, index) => {
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
                    href={path}>
                    {label}
                  </Link>
                )
              }
            </div>
          )
        })
      }
      {
        /*<Go />*/
      }
      {
        isSign && !firstName && !isSigninPage && (
          <Button className='button button--alive button--inverse button--border'
            href='/signin'>
              Sign In
          </Button>
        )
      }
      { children }
      {
        firstName && (
          <div className='header__navigation header__navigation--name'>
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
      {
        firstName && (
          <Link className='header__avatar' href='/account'>
            <Avatar className='avatar header__avatar__img'
              id={id}
              imageUrl={imageUrl}
            />
          </Link>
        )
      }
      {
        id && (
          <div className='header__bell'>
            <BellButton />
          </div>
        )
      }
      {
        visibleLinks && visibleLinks.length > 0 && (
          <div className='header__hamburger'>
            <HamburgerButton />
          </div>
        )
      }
    </div>
  )
}

Header.defaultProps = { isSign: true,
  LogoutLinkComponent: LogoutLink
}

export default withState(Header)
