// Import actions from action file
import {INCREMENT, DECREMENT} from '../actions/'

// REDUCER
// Function that takes in state and an action and returns new state
// Action is the object for the action
// Give default value for state so if nnone given
const counterReducer = (state = 0,action) => {
    // Modify state and return new state
    switch(action.type){
        case INCREMENT:
            return state+=1;
            break;
        
        case DECREMENT:
            return state-=1;
            break;
        
        default:
            // Always return default
            return state;
    }
}

export default counterReducer