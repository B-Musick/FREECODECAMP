// ACTIONS
// Passed to reducer to tell how to modify application state
export const INCREMENT = 'INCREMENT' // Increase the count
export const DECREMENT = 'DECREMENT' // Increase the count

// ACTION CREATORS
// Need to create a function that will return object with a type
export const incrementCount = () => {
    return {
        type: INCREMENT
    }
}

export const decrementCount = () => {
    return {
        type: DECREMENT
    }
}