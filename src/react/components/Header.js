import classnames from 'classnames'
import React from 'react'
import { connect } from 'react-redux'

import Avatar from './Avatar'
import BellButton from './BellButton'
import Button from './Button'
import Icon from './Icon'
import HamburgerButton from './HamburgerButton'
import Link from './Link'
import Logo from './Logo'

const withoutSigninPaths = ['/signin', '/signup']

const Header = ({ active,
  firstName,
  id,
  imageUrl,
  isSigninPage,
  menuLinks,
  pathname,
  projectName
}) => {
  return (<div className='header flex justify-start items-center'>
    <Link className='header__link flex justify-start items-center' href='/home'>
      <div>
        <Logo />
      </div>
      <div className='header__link__title'>
        { projectName }
      </div>
    </Link>
    <div className='header__empty flex-auto' />
    {
      menuLinks.map(({ label, path }, index) => {
        const isActiveLink = path.split('?')[0] === pathname
        return (<div
        className='header__navigation'
        key={index}
      >
        <Link
          className={classnames('header__navigation__item', {
            'header__navigation__item--active': isActiveLink
          })}
          href={path}
        >
          {label}
        </Link>
      </div>)})
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
      firstName && (<div
        className='header__navigation header__navigation--name'
      >
        <Link
          className={classnames('header__navigation__item', {
            'header__navigation__item--active': pathname === '/account'
          })}
          href='/account'
        >
          {firstName}
        </Link>
        {
          !active && (<svg className='header__navigation__alert'>
            <circle className='header__navigation__alert__circle' />
          </svg>)
        }
      </div>)
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
  </div>)
}

Header.defaultProps = {
  menuLinks: [],
  projectName: 'Transactions'
}

function mapStateToProps ({
  user: {
    active,
    firstName,
    id,
    imageUrl
  }
}, { pathname }) {
  return { active,
    firstName,
    id,
    imageUrl,
    isSigninPage: withoutSigninPaths.includes(pathname)
  }
}
export default connect(mapStateToProps)(Header)
