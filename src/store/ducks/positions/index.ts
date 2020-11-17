import { Reducer } from 'redux'
import { PositionsState } from './types'

const locations = [
  {  
    id: 1,
    city: 'Natal',
    state: 'Rio Grande do Norte',
    city_latitude: -5.7999146,
    city_longitude: -35.2922847,
    zoom: 12
  },
  {
    id: 2,
    city: 'Parnamirim',
    state: 'Rio Grande do Norte',
    city_latitude: -5.9224335,
    city_longitude: -35.2811418,
    zoom: 12
  },
  {
    id: 3,
    city: 'Macaíba',
    state: 'Rio Grande do Norte',
    city_latitude: -5.8605078,
    city_longitude: -35.372233,
    zoom: 14
  }
]
    
export const INITIAL_STATE = {
  positionsRepository: locations,
  currentPositions: {
    currentPosition: null,
    positionMap: null,
    knownPosition: 0
  }
}

export default function positionsReducer<PositionsState>(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'TOGGLE_POSITIONS_REPO':
      return {...state, positionsRepository: action.positionsRepository}
    case 'TOGGLE_CURRENT_POSITION':
      return {...state, 
        currentPositions: {
          ...state.currentPositions,
          currentPosition: action.currentPosition,
          knownPosition: action.knownCity 
        }
      }
    case 'TOGGLE_POSITION_MAP':
      return {...state, 
        currentPositions: { ...state.currentPositions,
          positionMap: action.positionMap
        }
      }
    default:
      return state
  }
}
