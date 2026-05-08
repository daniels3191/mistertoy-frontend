import { createStore, combineReducers } from 'redux'

import { toyReducer } from './toy.reducer.js'
import { userReducer } from './user.reducer.js'

const rootReducer = combineReducers({
    toyModule: toyReducer,
    userModule: userReducer,
})

// const middleware = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()
export const store = createStore(rootReducer)

// For debug
// store.subscribe(() => {
//     console.log('Current state is:', store.getState())
// })

window.gStore = store