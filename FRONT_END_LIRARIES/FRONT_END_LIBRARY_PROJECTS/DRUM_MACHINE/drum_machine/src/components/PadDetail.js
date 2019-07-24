import React from 'react';

const PadDetail = (props) => {
    let thisKey = props.key;
    return (
        // Each individual drum-pad has the class 'drum-pad'
        <div className="drum-pad">
            {/* Each should have id describing audio, inner text with key 
            The src = thisKey letter passed in*/}
            <audio className="clip" id={thisKey} src={props.thisKey}>{thisKey}</audio>

        </div>
    )
}

export default PadDetail;