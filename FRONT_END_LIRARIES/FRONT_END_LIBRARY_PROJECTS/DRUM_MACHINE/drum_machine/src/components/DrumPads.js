import React from 'react';
import { connect } from 'react-redux';
import { selectPad } from '../actions'
import PadDetail from './PadDetail';

// import PadDetail from './components/PadDetail';

class DrumPads extends React.Component {
    
    handleKeyDown(e){
        document.getElementById(e.key.toUpperCase()).play();   
    }
    
    componentDidMount(){
        // Allows you to handle key events
        document.addEventListener('keydown', (e)=>{
            // Have to make sure the button your pressing is one of the defined keys
            // otherwise get an error
            if(this.props.pads.find(pad=>pad.key===e.key.toUpperCase())){
                this.handleKeyDown(e)
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
  
                <div className={"col-"+count}>
                    <button
                        // This will select the beat to play in the reducer using event handler
                        onClick={() => this.props.selectPad(pad.key)}
    
                    >
                        
                        <PadDetail padKey={pad.key} />
                    </button>
                </div>

            )
           
            
        });
    }
    render() {
        return (
            // Print out the whole list
            <div id="display">
                {this.renderList()}
            </div>
        )
    }




}
const mapStateToProps = (state) => {
    // Takes state from store ands provides it to DrumPads component

    return { pads: state.pads }

}

export default connect(mapStateToProps, { selectPad })(DrumPads);