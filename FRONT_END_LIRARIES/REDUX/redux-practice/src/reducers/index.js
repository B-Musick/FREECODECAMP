import {combineReducers} from 'redux'
import counterReducer from './counterReducer'

export default combineReducers({
    // key: state // Key for the store and set reducer
    count: counterReducer
})