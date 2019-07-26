import React from 'react';
import { connect } from 'react-redux';
import { selectPad } from '../actions'
import PadDetail from './PadDetail';

// import PadDetail from './components/PadDetail';

class DrumPads extends React.Component {
    
    handleKeyDown(e, keyObject){
        document.getElementById(e.key.toUpperCase()).play();
        // Display something to the page (User Stor)
       
 
        document.getElementById('display').textContent = keyObject.displayText;   
    }
    componentDidMount(){
        
        // Allows you to handle key events
        document.addEventListener('keydown', (e)=>{
            
            // Find the currently selected pad object
            let selectedPad = this.props.pads.find(pad => pad.key === e.key.toUpperCase());
            // Have to make sure the button your pressing is one of the defined keys
            // otherwise get an error
            if(selectedPad){
                // Pass in the object so we can get the text to display on screen
                this.handleKeyDown(e,selectedPad)
            }
        })
    }
    // selectPad action creator will be called here 
    renderList() {
        // We will render the list of PadDetail's here, then render it
        let count = -1; // Used to label the column number
        
        return this.props.pads.map((pad) => {
            
            
            // Loop through list of pad objects
            count++;
            return (
                <a className={"pad col-" + count}
                    // This will select the beat to play in the reducer using event handler
                    onClick={() => this.props.selectPad(pad.key)}

                >  
                    <div className="column-anchor">

                        
                        <PadDetail padKey={pad.key} />
                    
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




}
const mapStateToProps = (state) => {
    // Takes state from store ands provides it to DrumPads component

    return { pads: state.pads }

}

export default connect(mapStateToProps, { selectPad })(DrumPads);