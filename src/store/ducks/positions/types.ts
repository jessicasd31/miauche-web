// Action types
export enum PositionsTypes {
  REQUEST = '@positions/REQUEST',
  SUCCESS = '@positions/SUCCESS',
  FAILURE = '@positions/FAILURE'
}

// Data types
export interface Position {  
  id?: number,
  city: string,
  uf: string,
  latitude: number,
  longitude: number,
  zoom: number
}

export interface Positions {
  currentPosition: Position,
  positionMap: Position,
  knownPosition: number
}

// State type
export interface PositionsState {
  readonly data: Position[],
  readonly loading: boolean,
  readonly error: boolean
}