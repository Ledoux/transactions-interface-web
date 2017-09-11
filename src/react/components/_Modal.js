import classnames from 'classnames'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { closeModal,
  getLocationSearchString,
  showModal
} from 'transactions-interface-state'

import IconButton from './IconButton'
import Warning from './Warning'

const Modal = class Modal extends Component {
  constructor () {
    super()
    this.handleNavigation = this._handleNavigation.bind(this)
    this.onClickClose = this._onClickClose.bind(this)
  }
  componentDidMount () {
    this.handleNavigation()
  }
  componentDidUpdate (prevProps) {
    if (this.props.search.modal !== prevProps.search.modal) {
      this.handleNavigation()
    }
  }
  _handleNavigation () {
    const { search,
      showModal
    } = this.props
    const { icon,
      modal,
      text
    } = search
    if (modal === 'Warning') {
      const nextSearch = Object.assign({}, search)
      delete nextSearch.modal
      delete nextSearch.icon
      delete nextSearch.text
      showModal(<Warning
        icon={icon}
        nextLocation={{
          search: getLocationSearchString(nextSearch)
        }}
        text={text}
      />)
    }
  }
  _onClickClose () {
    const { beforeCloseModal,
      closeModal,
    } = this.props
    if (beforeCloseModal) {
      beforeCloseModal()
    }
    closeModal()
  }
  render () {
    const { onClickClose } = this
    const { content,
      isActive,
      isCtaCloseButton,
      isCornerCloseButton,
      isOutCloseButton
    } = this.props
    const classes = classnames({
      'modal--active': isActive
    }, 'modal')
    return (
      <div className={classes}
        role='dialog'
        onClick={isOutCloseButton && onClickClose}
      >
        <div
          className='modal__dialog'
          role='document'
          onClick={e => {
            e.nativeEvent.stopImmediatePropagation() // Prevent click bubbling and closing modal
            e.stopPropagation()
          }}
        >
          {
            isCornerCloseButton && (<button
              type='button'
              className='button button--plain modal__close'
              onClick={onClickClose}
            >
              ✕
            </button>)
          }
          <div className='modal__content'>
            {content}
          </div>
          {
            isCtaCloseButton && (<div className='modal__close-cta'>
              <IconButton
                className='button button--alive icon-button'
                icon='cross'
                onClick={onClickClose}
                text='Close'
              />
            </div>)
          }
        </div>
      </div>
    )
  }
}

Modal.defaultProps = {
  search: {}
}

Modal.PropTypes = {
  isActive: PropTypes.bool.isRequired,
  beforeCloseModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  content: PropTypes.node
}

const mapStateToProps = ({ modal: { beforeCloseModal,
    content,
    isActive,
    isCtaCloseButton,
    isCornerCloseButton,
    isOutCloseButton
  }, search
}) => {
  return { beforeCloseModal,
    content,
    isActive,
    isCtaCloseButton,
    isCornerCloseButton,
    isOutCloseButton,
    search
  }
}

export default connect(mapStateToProps, { closeModal,
  showModal
})(Modal)
