import React, { Component } from 'react'
import { connect } from 'react-redux'
const { apiFetch,
  getUpdatedSearchString
} = require('transactions-interface-state').default

import Button from './Button'

class TourButton extends Component {
  constructor () {
    super ()
    this.handleTourRequest = this._handleTourRequest.bind(this)
  }
  _handleTourRequest () {
    const { email,
      helpersCollectionName,
      history,
      userEmail } = this.props
    if (email === userEmail) {
      if (history) {
        history.push({
          search: getUpdatedSearchString({
            helpersCollectionName
          })
        })
      } else {
        console.warn('TourButton has no history function defined')
      }
    }
  }
  componentDidMount () {
    this.handleTourRequest()
  }
  componentDidUpdate () {
    this.handleTourRequest()
  }
  render () {
    const { className,
      email,
      path
    } = this.props
    return (
      <Button
        className={className || 'button button--alive button--cta'}
        onClick={() => {
          apiFetch(path, {
            method: 'POST',
            body: JSON.stringify({
              email
            })
          }).then(result => console.log(result))
        }
      }
      >
        Take a tour
      </Button>
    )
  }
}

function mapStateToProps({
  user: {
    email
  }
}) {
  return {
    userEmail: email
  }
}
export default connect(mapStateToProps)(TourButton)
