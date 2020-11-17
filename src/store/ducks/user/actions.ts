import { User } from './types'

export function toggleUserLogged (user: User|null) {
  return {
    type: 'TOGGLE_USER_LOGGED',
    user
  }
}
