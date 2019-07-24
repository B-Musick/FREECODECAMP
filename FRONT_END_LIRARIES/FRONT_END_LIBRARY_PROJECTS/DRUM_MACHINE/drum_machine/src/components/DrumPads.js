import React from 'react';
import { connect } from 'react-redux';
import { selectPad } from '../actions'
import PadDetail from './PadDetail';

// import PadDetail from './components/PadDetail';

class DrumPads extends React.Component {

    // selectPad action creator will be called here 
    renderList() {
        // We will render the list of PadDetail's here, then render it
        return this.props.pads.map((pad) => {
            // Loop through list of pad objects
            
            return (
                <button
                // This will select the beat to play in the reducer using event handler
                    onClick={()=>this.props.selectPad(pad.key)}
                    >
                    <PadDetail padKey={pad.key} />
                </button>
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