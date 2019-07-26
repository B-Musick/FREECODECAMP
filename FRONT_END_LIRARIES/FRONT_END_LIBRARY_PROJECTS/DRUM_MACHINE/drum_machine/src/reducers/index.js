import { combineReducers } from 'redux';
/************************** REDUCERS *************************************** */
//  Provide state to the store, which is then provided to all components

// drum pad list reducer providing list of all the pads
const drumListReducer = () => {
    // Return array of drum-pad objects
    
    return [
        { key: 'Q', 'Q': "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", displayText:'HEATER-1' },
        { key: 'W', 'W': "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", displayText: 'HEATER-6' },
        { key: 'E', 'E': "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", displayText: 'BRK_SNR' },
        { key: 'A', 'A': "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", displayText: 'CHORD-2' },
        { key: 'S', 'S': "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", displayText: 'PUNCHY KICK'  },
        { key: 'D', 'D': "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", displayText: 'LIGHTY'  },
        { key: 'Z', 'Z': "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", displayText: 'KICK 1'  },
        { key: 'X', 'X': "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", displayText: 'DRY'  },
        { key: 'C', 'C': "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", displayText: 'CHORD-1'  }
    ]
}

const selectedPadReducer = (selectedPad = null, action) => {
    if (action.type === 'PAD_SELECTED') {
        // Eventually need to change this, so that the logic occurs by placing the
        // selected song in the state then using it
        drumListReducer().forEach(pad =>{
            // Displays text when select the key with mouse
            if(pad.key === action.payload){
                document.getElementById('display').textContent = pad.displayText;
            }
        })
        
        document.getElementById(action.payload).play();
        // Need to get this to be the text of the objectf
        // Try to get this to set the state of the selected pad
        
        return action.payload;
    }

    return selectedPad;
}

export default combineReducers ({
    // Has return a function
        pads: drumListReducer,
        selectedPad: selectedPadReducer
});