import React from 'react';

const Button = (props) => {
    // Receives props from mapping of the buttons in calcDisplay method 
    // of Buttons Component which gets its state from App Component
    return (
        <div>
            <a id={props.button.id}>{props.button.val}</a>
        </div>
        
    )
}

export default Button;