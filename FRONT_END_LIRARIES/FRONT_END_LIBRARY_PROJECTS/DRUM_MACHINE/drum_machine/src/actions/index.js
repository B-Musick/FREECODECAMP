export const selectPad = (sound) => {
    
    return {
        // Returns sound as action
        type: 'PAD_SELECTED',
        payload: sound
    }
}

// export const setPad = (pad) => {
//     return{
//         type: 'SET_PAD',
//         payload: pad 
//     }
// }