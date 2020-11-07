import { createStore, Store } from 'redux'
import { Positions } from './ducks/positions/types'

import rootReducer from './ducks/rootReducer'

export interface ApplicationState {
  positions: Positions
}

const store: Store<ApplicationState> = createStore(rootReducer)


export default store;
