import classnames from 'classnames'
import React from 'react'
import { Information as withState } from 'transactions-interface-state'

const Information = ({ activePathname,
  closeInformation,
  isActive,
  notifications,
  showModal
}) => {
  const classes = classnames({
    'information--showing': isActive
  }, 'information')
  return (
    <div className={classes} onClick={() => closeInformation()}>
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
    </div>
  )
}

export default withState(Information)
