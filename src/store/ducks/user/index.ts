import { UsersState } from './types'
    
export const INITIAL_STATE: UsersState = {
  userLogged: null
}

export default function positionsReducer<UsersState>(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'TOGGLE_USER_LOGGED':
      return {...state, userLogged: action.user}
    default:
      return state
  }
}
