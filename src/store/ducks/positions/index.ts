import { Reducer } from 'redux'
import { Positions } from './types'

const INITIAL_STATE = {
  currentPosition: null,
  positionMap: null,
  knownPosition: 0
}

export default function positionsReducer<Positions>(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'TOGGLE_CURRENT_POSITION':
      return {...state, 
        currentPosition: action.currentPosition, 
        knownPosition: action.knownCity }
    case 'TOGGLE_POSITION_MAP':
      return {...state, positionMap: action.positionMap}
    default:
      return state
  }
}