// Data types
export interface Position {  
  id?: number,
  city: string,
  state: string,
  city_latitude: number,
  city_longitude: number,
  zoom: number
}

export interface Positions {
  currentPosition: Position,
  positionMap: Position,
  knownPosition: number
}

// State type
export interface PositionsState {
  readonly positionsRepository: Position[],
  readonly currentPositions: Positions
}
