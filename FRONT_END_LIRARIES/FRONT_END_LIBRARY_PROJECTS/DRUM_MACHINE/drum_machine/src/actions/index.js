export const selectPad = (sound) => {
    return {
        // Returns sound as action
        type: 'PAD_SELECTED',
        payload: sound
    }
}