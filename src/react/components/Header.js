import classnames from 'classnames'
import React from 'react'
import { Header as withState } from 'transactions-interface-state'
import { LogoutLink } from 'transactions-user-web'

import Avatar from './Avatar'
import BellButton from './BellButton'
import Button from './Button'
import EmblemLink from './EmblemLink'
import Icon from './Icon'
import HamburgerButton from './HamburgerButton'
import Link from './Link'
import Navigation from './Navigation'

const Header = ({ active,
  firstName,
  id,
  imageUrl,
  isSigninPage,
  LogoutLinkComponent,
  menuLinks,
  pathname,
  state
}) => {
  const { visibleLinks } = state
  return (
    <div className='header flex justify-start items-center'>
      <Navigation LogoutLinkComponent={LogoutLinkComponent}
        visibleLinks={visibleLinks} />
      <EmblemLink />
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
        !firstName && !isSigninPage && (
          <Button className='button button--alive button--inverse button--border'
            href='/signin'>
              Sign In
          </Button>
        )
      }
      {
        firstName && (
          <div className='header__navigation header__navigation--name'>
            <Link className={classnames('header__navigation__item', {
                'header__navigation__item--active': pathname === '/account'
              })}
              href='/account' >
              { firstName }
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
      {
        firstName && (
          <div className='header__avatar'>
            <Avatar className='avatar header__avatar__img'
              id={id}
              imageUrl={imageUrl}
            />
          </div>
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

Header.defaultProps = {
  LogoutLinkComponent: LogoutLink
}

export default withState(Header)
