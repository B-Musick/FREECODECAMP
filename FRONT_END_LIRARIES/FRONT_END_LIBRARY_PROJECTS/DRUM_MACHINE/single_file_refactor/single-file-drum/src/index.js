// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio
import React from 'react';
import ReactDOM from 'react-dom';

/*********************************COMPONENTS ******************************** */

/*******************APP*************** */
const App = () => {
    return (
        <div id="drum-machine">
            <DrumPads />
        </div>
    )
}
// export default App;
/****************DRUMPAD************** */


// import PadDetail from './components/PadDetail';

class DrumPads extends React.Component {
    constructor(props){
        // Instantiat drumpads with the react methods
        super(props)
        // Initialize the state of 'DrumPads'
        this.state = {
            selectedPad: {},
            pads: [
                { key: 'Q', 'Q': "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3", displayText: 'HEATER-1' },
                { key: 'W', 'W': "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3", displayText: 'HEATER-6' },
                { key: 'E', 'E': "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3", displayText: 'BRK_SNR' },
                { key: 'A', 'A': "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3", displayText: 'CHORD-2' },
                { key: 'S', 'S': "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3", displayText: 'PUNCHY KICK' },
                { key: 'D', 'D': "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3", displayText: 'LIGHTY' },
                { key: 'Z', 'Z': "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3", displayText: 'KICK 1' },
                { key: 'X', 'X': "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3", displayText: 'DRY' },
                { key: 'C', 'C': "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3", displayText: 'CHORD-1' }
            ]
        }
    }

    handleKeyDown(e, keyObject) {
        // Called from componentDidMount() if key is pressed that matches a pad
        document.getElementById(e.key.toUpperCase()).play();
        // Displays the text associated with the button pressed
        document.getElementById('display').textContent = keyObject.displayText;
    }
    handleOnClick = (e)=> {
        this.setState({ selectedPad: e}) // Set the state of selected pad
        document.getElementById('display').textContent = e.displayText; // Display pad name
        document.getElementById(`${e.key}`).play(); // Play the sound
    }
    componentDidMount() {
        // Allows you to handle key events
        document.addEventListener('keydown', (e) => {

            // Find the currently selected pad object
            let selectedPad = this.state.pads.find(pad => pad.key === e.key.toUpperCase());
            // Have to make sure the button your pressing is one of the defined keys
            // otherwise get an error
            if (selectedPad) {
                // Pass in the object so we can get the text to display on screen
                this.handleKeyDown(e, selectedPad)
            }
        })
    }
    // selectPad action creator will be called here 
    renderList() {
        // We will render the list of PadDetail's here, then render it
        let count = -1; // Used to label the column number

        return this.state.pads.map((pad) => {
            // Loop through list of pad objects
            count++; // This will label the column of the pad
            return (
                <a className={"pad col-" + count}
                    // This will select the beat to play in the reducer using event handler
                    onClick={((()=>this.handleOnClick(pad)))}
                    
                >
                    <div className="column-anchor">
                        <PadDetail pad={pad} />
                    </div>
                </a>
            )
        });
    }

    render() {
        return (
            // Print out the whole list
            <div id="list-display">
                {this.renderList()}
                <p id="display"></p>
            </div>
        )
    }
} // DrumPads

const PadDetail = (props) => {
    let pad = props.pad; 

    if (!pad) {
        // If no pad selected
        return null;
    } else {
        return (
            // Each individual drum-pad has the class 'drum-pad'
            <div className="drum-pad" id={"pad="+pad.key}>
                {/* Each should have id describing audio, inner text with key 
            The src = thisKey letter passed in*/}
                {pad.key} 
                
                <audio key={pad.key} className="clip" id={pad.key} src={pad[pad.key]}>{pad.key}</audio>
            </div>
        )
    }
}

/******************************* ReactDOM *********************************** */
ReactDOM.render(
    
        <App />
        
    
    ,
    document.getElementById('root')
);
