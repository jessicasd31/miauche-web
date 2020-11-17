import { createStore, Store } from 'redux'
import { PositionsState } from './ducks/positions/types'
import { UsersState } from './ducks/user/types'

import rootReducer from './ducks/rootReducer'

export interface ApplicationState {
  positions: PositionsState,
  user: UsersState 
}

const store: Store<ApplicationState> = createStore(rootReducer)

export default store;
