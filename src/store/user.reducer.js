import { userService } from "../services/user.service.js"

const initialState = {
    loggedinUser: userService.getLoggedinUser(),
}

export const SET_USER = 'SET_USER'
export const SET_USER_BALANCE = 'SET_USER_BALANCE'

export function userReducer(state = initialState, cmd) {
    switch (cmd.type) {
        case SET_USER:
            return { ...state, loggedinUser: cmd.loggedinUser }
    
        case SET_USER_BALANCE:
            if (!state.loggedinUser) return state
            
            const balance = state.loggedinUser.balance + 10
            const loggedinUser = { ...state.loggedinUser, balance }
            return { ...state, loggedinUser }
    
        default:
            return state
    }
}