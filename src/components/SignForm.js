import React, { Component } from 'react'
import { connect } from 'react-redux'
const { closeModal,
  showModalWarning
} = require('transactions-interface-state').default

import Button from './Button'
import Link from './Link'

function getReturnState () {
  let returnTo
  let returnMessage
  const search = window.location.search
  returnTo = (search.match(/returnTo=([^&]*)/) || [null, null])[1]
  returnMessage = (search.match(/returnMessage=([^&]*)/) || [null, null])[1]
  if (returnMessage) {
    returnMessage = decodeURIComponent(returnMessage)
  }
  return {
    returnTo,
    returnMessage
  }
}

class SignForm extends Component {
  constructor () {
    super()
    const { returnMessage, returnTo } = getReturnState()
    // it is important to initialize email and password with empty
    // string to make already the input components as controlled component
    // otherwise you will get this typical 'switched from uncontrolled' to 'controlled'
    // component from React error logs when you type text inside the input
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      subscription: {
        selector: false,
        reviewer: false,
        editor: false
      },
      returnMessage,
      returnTo
    }
    this.handleChangeValue = this._handleChangeValue.bind(this)
    this.handleClickCheckValue = this._handleClickCheckValue.bind(this)
  }
  _handleChangeValue (event, key) {
    this.setState({[key]: event.target.value})
  }
  _handleClickCheckValue (key, value) {
    const oldContent = this.state[key]
    this.setState({[key]: Object.assign(oldContent, {
      [value]: !oldContent[value]
    })})
  }
  componentDidMount () {
    const { returnMessage } = this.state
    const { history,
      showModalWarning
    } = this.props
    if (returnMessage) {
      showModalWarning('exclamation', returnMessage)
      history.push(window.location.pathname)
      this.setState({returnMessage: null})
    }
  }
  render () {
    const { handleChangeValue,
      handleClickCheckValue
    } = this
    const { data,
      email,
      endpoint,
      firstName,
      lastName,
      message,
      password,
      returnMessage,
      returnTo,
      signPath
    } = this.props
    const isSignup = endpoint === 'signup'
    const isSignin = endpoint === 'signin'
    return (<form className='sign-form p3'
      method='post'
      action={`${signPath}/${endpoint}`}
    >
      {
        isSignup && (<div className='sign-form__entry'>
          <p className='sign-form__entry__field'>
            First Name
          </p>
          <input
            className='sign-form__entry__input field'
            name='firstName'
            type='text'
            value={firstName}
            onChange={event => handleChangeValue(event, 'firstName')}
            required
          />
        </div>)
      }
      {
        isSignup && (<div className='sign-form__entry'>
          <p className='sign-form__entry__field'>
            Last Name
          </p>
          <input
            className='sign-form__entry__input field'
            name='lastName'
            type='text'
            value={lastName}
            onChange={event => handleChangeValue(event, 'lastName')}
            required
          />
        </div>)
      }
      <div className='sign-form__entry'>
        <p className='sign-form__entry__field'>
          Email
        </p>
        <input
          className='sign-form__entry__input field'
          name='email'
          type='text'
          value={email}
          onChange={event => handleChangeValue(event, 'email')}
          required
        />
      </div>
      <div className='sign-form__entry'>
        <p className='sign-form__entry__field'>
          Password
        </p>
        <input
          className='sign-form__entry__input mb1'
          name='password'
          type='password'
          value={password}
          onChange={event => handleChangeValue(event, 'password')}
          required
        />
        {
          isSignin && <Link
            href={`/forgot-password${email ? `?email=${encodeURIComponent(email)}` : ''}`}
          >
            Forgot Password ?
          </Link>
        }
      </div>
      <div className='sign-form__message center'>
        { message }
      </div>
      <div className='sign-form__submit center'>
        <Button
          className='button button--alive button--cta'
          type='submit'
        >
          { isSignin && 'Sign In' }
          { isSignup && 'Sign Up' }
        </Button>
      </div>
      <div className='sign-form__option center'>
        {
          isSignin && (<div className='center'>
            No account?{' '}
            <Link
              className='link'
              href='/signup'
            >
              Sign up
            </Link>
          </div>)
        }
        { isSignup && <div className='center'>
            Already have an account?{' '}
            <Link
              href={`/signin${returnTo ? '?returnTo=' + returnTo : ''}`}
            >
              Sign In
            </Link>
          </div>
        }
      </div>
    </form>)
    }
}

export default connect(null, {
  closeModal,
  showModalWarning
})(SignForm)
