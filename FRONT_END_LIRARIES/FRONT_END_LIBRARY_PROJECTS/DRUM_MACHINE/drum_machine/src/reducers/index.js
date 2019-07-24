import { combineReducers } from 'redux';
/************************** REDUCERS *************************************** */
//  Provide state to the store, which is then provided to all components

// drum pad list reducer providing list of all the pads
const drumListReducer = () => {
    // Return array of drum-pad objects
    
    return [
        { key: 'Q', 'Q': "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" },
        { key: 'W', 'W': "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" },
        { key: 'E', 'E': "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3" },
        { key: 'A', 'A': "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3" },
        { key: 'S', 'S': "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3" },
        { key: 'D', 'D': "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3" },
        { key: 'Z', 'Z': "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" },
        { key: 'X', 'X': "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3" },
        { key: 'C', 'C': "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3" }
    ]
}

const selectedPadReducer = (selectedPad = null, action) => {
    if (action.type === 'PAD_SELECTED') {
        document.getElementById(action.payload).play();
        return action.payload;
    }

    return selectedPad;
}

export default combineReducers ({
    // Has return a function
        pads: drumListReducer,
        selectedPad: selectedPadReducer
});