import React from 'react';
import { connect } from 'react-redux';
import { selectPad } from '../actions'

class PadDetail extends React.Component {
    render(){
        const pad = this.props; // pad.padKey, pad.pads.key, pad.pads.[pad.padKey]
        // console.log(this.props)
        if(!pad){
            return null;
        }else{
            return (
                // Each individual drum-pad has the class 'drum-pad'
                <div className="drum-pad" id={`pad=${pad.key}`}>
                    {/* Each should have id describing audio, inner text with key 
            The src = thisKey letter passed in*/}
                    {pad.padKey}
                    <audio key={pad.key} className="clip" id={pad.padKey} src={pad.pads[pad.padKey]}>{pad.key}</audio>
                    {/* <button onClick={document.getElementById().play()} ></button> */}

                </div>
            )
        }

    }

}
const mapStateToProps = (state, ownProps) => {
    // Find the user we care about, component has access to this.props.users
    // Can use this method to do calculations on the info coming in 
    // So we can extract a single user here
    // We can access the props about to be passed to render component through 'ownProps'
    // console.log(ownProps.padKey)
    return { pads: state.pads.find(pad => pad.key === ownProps.padKey) }
}
export default connect(
    mapStateToProps,
    { selectPad }
    
)(PadDetail);

