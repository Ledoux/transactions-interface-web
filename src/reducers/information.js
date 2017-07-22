import assign from 'lodash.assign'

import { trackEvent } from '../utils/tracking'

export const SHOW_INFORMATION = 'SHOW_INFORMATION'
export const CLOSE_INFORMATION = 'CLOSE_INFORMATION'

const intialState = {
  isActive: false
}

export default function information (state = intialState, action) {
  switch (action.type) {
    case SHOW_INFORMATION:
      return assign({}, state, {
        isActive: true
      })
    case CLOSE_INFORMATION:
      return assign({}, state, {
        isActive: false
      })
    default:
      return state
  }
}

export function closeInformation () {
  trackEvent('closeInformation')
  return { type: CLOSE_INFORMATION }
}

export function showInformation () {
  trackEvent('showInformation')
  return { type: SHOW_INFORMATION }
}
