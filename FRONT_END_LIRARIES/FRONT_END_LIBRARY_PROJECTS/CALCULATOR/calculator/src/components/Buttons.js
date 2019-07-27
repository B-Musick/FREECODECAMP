import React from 'react';

import Button from './Button';

const Buttons = (props) =>{
    

    let onButtonClick = (value) => {
        console.log(value)
        console.log(this.props)
        // this.props.onClick(value)
    }

    let calcDisplay = props.buttons.map((button, index)=>{
        // buttons is an array of all the button objects, which have a val and id
        // buttons is deconstructed value from the App Component
        console.log(button)
        return <Button onClick={onButtonClick} button={button} key={index} />
    })
    
    return (
        <div className="button-board">
            {/* Calls the calcDisplay method and prints out the buttons */}
            {calcDisplay}
        </div>

    )
    

    
}

export default Buttons;