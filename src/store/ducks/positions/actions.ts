import { Position } from './types'

export function toggleCurrentPosition (currentPosition: Position|null, knownCity: number|null) {
  return {
    type: 'TOGGLE_CURRENT_POSITION',
    currentPosition,
    knownCity
  }
}

export function togglePositionMap (positionMap: Position|null) {
  return {
    type: 'TOGGLE_POSITION_MAP',
    positionMap
  }
}