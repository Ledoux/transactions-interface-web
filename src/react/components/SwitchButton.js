import classnames from 'classnames'
import React, { Component } from 'react'

class SwitchButton extends Component {
  constructor () {
    super()
    this.state = { isSwitchButtoned: false }
    this.handleSwitchButtonClick = this._handleSwitchButtonClick.bind(this)
  }
  _handleSwitchButtonClick () {
    this.setState({ isSwitchButtoned: !this.state.isSwitchButtoned})
    this.props.handleToggleClick()
  }
  render () {
    const {
      handleSwitchButtonClick
    } = this
    const { className,
      OnElement,
      OffElement
    } = this.props
    const {
      isSwitchButtoned
    } = this.state
    return (
      <button
        className={classnames({
          'switch-button--off': !isSwitchButtoned,
          'switch-button--on': isSwitchButtoned
        }, className)}
        onClick={handleSwitchButtonClick}
      >
        <div className='flex items-center justify-center'>
          { isSwitchButtoned ? OnElement : OffElement}
        </div>
      </button>
    )
  }
}

SwitchButton.defaultProps = { OffElement: <p> OFF </p>,
  OnElement: <p> ON </p>
}

export default SwitchButton
