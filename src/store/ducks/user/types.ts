// Data types
export interface User {  
  id?: number,
  name: string,
  email: string,
  profile: string,
  password: string,
  createdAt: Date,
  active: boolean,
  shelter_id: number,
  token?: string
}

export interface Users {
  usersShelter: User[],
}

// State type
export interface UsersState {
  readonly userLogged: User | null
}
