import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getNormalizerEntities,
  mergeNormalizerEntities
} from 'transactions-redux-normalizer'
const { closeInformation } = require('transactions-interface-state').default

class Information extends Component {
  constructor () {
    super ()
    this.state = { hasRequestedOnce: false }
  }
  componentDidMount () {
    const { dispatch,
      requestTransactions,
      userId
    } = this.props
    const { hasRequestedOnce } = this.state
    if (userId && !hasRequestedOnce) {
      this.setState({ hasRequestedOnce: true })
      dispatch(requestTransactions('GET', [{
        collectionName: 'notifications',
        query: { userId },
      }], { tag: 'notifications' }))
    }
  }
  componentDidUpdate (prevProps) {
    const { dispatch,
      isActive,
      isMockUser,
      requestTransactions,
      notSeenNotifications,
      userId
    } = this.props
    // when we close the information menu
    // we can set to seen the previous unseen notifications
    if (prevProps.isActive && !isActive) {
      if (isMockUser) {
        const entities = notSeenNotifications.map(notSeenNotification => {
          return {
            id: notSeenNotification.id,
            isSeen: true
          }
        })
        dispatch(mergeNormalizerEntities('notifications', entities))
      } else {
        dispatch(requestTransactions('PUT', [{
          collectionName: 'notifications',
          query: {
            isSeen: false,
            userId
          },
          update: { isSeen: true }
        }], { tag: 'notifications' }))
      }
    }
  }
  render () {
    const { activePathname,
      dispatch,
      isActive,
      notifications,
      showModal
    } = this.props
    const classes = classnames({
      'information--showing': isActive
    }, 'information')
    return (<div className={classes} onClick={() => dispatch(closeInformation())}>
      <nav className='information__list'
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation() // Prevent click bubbling and closing modal
          e.stopPropagation()
      }}>
        {
          notifications && notifications
            .sort((firstNotification, secondNotification) => {
              return secondNotification.date - firstNotification.date
            })
            .map(({ date,
              isSeen,
              rawHTML,
              text
            }, index) => {
              const notificationDate = new Date()
              date && notificationDate.setMilliseconds(date)
              const notificationDateString =notificationDate && notificationDate
                .toDateString()
                .split(' ')
                .slice(0, -1)
                .join(' ')
              return (<div
                  className={classnames('information__list__item', {
                    'information__list__item--seen': isSeen
                  })}
                  key={index}
                >
                  {
                    text && (<p className='information__list__item__text'>
                      {text}
                    </p>)
                  }
                  {
                    rawHTML && <div
                      className='information__list__item__html'
                      dangerouslySetInnerHTML={{ __html: rawHTML }}
                    />
                  }
                  <p className='information__list__item__date'>
                    {notificationDateString}
                  </p>
                </div>
              )
            })}
      </nav>
    </div>)
  }
}

const mapStateToProps = (state, { getFilteredElements }) => {
  const {
    information: { isActive },
    user: { id,
      isMock
    }
  } = state
  const notifications = getNormalizerEntities(state, 'notifications')
  const notSeenNotifications = getFilteredElements(state, 'WITH_NOT_IS_SEEN', 'notifications')
  return {
    isActive,
    isMockUser: isMock,
    notifications,
    notSeenNotifications,
    userId: id
  }
}
export default connect(mapStateToProps, dispatch => {
  return { dispatch }
})(Information)
