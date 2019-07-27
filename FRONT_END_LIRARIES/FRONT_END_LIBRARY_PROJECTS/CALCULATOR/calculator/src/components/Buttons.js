import React from 'react';

import Button from './Button';

const Buttons =({buttons})=>{


    let calcDisplay = buttons.map((button, index)=>{
        // buttons is an array of all the button objects, which have a val and id
        // buttons is deconstructed value from the App Component
        return <Button button={button} key={index} />
    })

    return (
        <div className="button-board">
            {/* Calls the calcDisplay method and prints out the buttons */}
            {calcDisplay}    
        </div>

    )
    
}

export default Buttons;