import React from 'react';

import Button from './Button';

class Buttons extends React.Component {
    state = {
        buttons: [
            { id: 'equals', val: '=' },
            { id: 'zero', val: 0 },
            { id: 'one', val: 1 },
            { id: 'two', val: 2 },
            { id: 'three', val: 3 },
            { id: 'four', val: 4 },
            { id: 'five', val: 5 },
            { id: 'six', val: 6 },
            { id: 'seven', val: 7 },
            { id: 'eight', val: 8 },
            { id: 'nine', val: 9 },
            { id: 'add', val: "+" },
            { id: 'subtract', val: "-" },
            { id: 'multiply', val: "*" },
            { id: 'divide', val: "/" },
            { id: 'clear', val: "CE" }, // When clear button pressed, should clear input and output setting to 0
            { id: 'decimal', val: "." }

        ]
    }

    onButtonClick = (value, id) => {
        // Retrieves value from Button Component when pressed
        // Passes it into the App
        this.props.onClick(value,id);
    }

    calcDisplay = this.state.buttons.map((button, index) => {
        // buttons is an array of all the button objects, which have a val and id
        // buttons is value from the state of this Component
        console.log(button)
        return <Button onClick={this.onButtonClick} button={button} key={index} />
    })

    render(){
        return (
            <div className="button-board">
                {/* Calls the calcDisplay method and prints out the buttons */}
                {this.calcDisplay}
            </div>

        )
    }




}

export default Buttons;