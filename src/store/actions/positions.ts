interface Loc {
  id?: number,
  city: string,
  uf: string,
  latitude: number,
  longitude: number,
  zoom: number
}

export function toggleCurrentPosition (currentPosition: Loc|null, knownCity: number|null) {
  return {
    type: 'TOGGLE_CURRENT_POSITION',
    currentPosition,
    knownCity
  }
}

export function togglePositionMap (positionMap: Loc|null) {
  return {
    type: 'TOGGLE_POSITION_MAP',
    positionMap
  }
}