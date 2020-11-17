import { Position } from './types'
import { action } from 'typesafe-actions'

export function toggleCurrentPosition (currentPosition: Position|null, knownCity: number|null|undefined) {
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

export function togglePositionRepo (positionsRepository: Position[]|null) {
  return {
    type: 'TOGGLE_POSITIONS_REPO',
    positionsRepository
  }
}


export const request = () => action('REQUEST');

export const success = (data: Position[]) => action('SUCCESS', { data });

export const failure = () => action('FAILURE');