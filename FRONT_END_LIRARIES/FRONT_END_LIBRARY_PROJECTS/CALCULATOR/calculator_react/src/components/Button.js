import React from 'react';

class Button extends React.Component{
    state = {}
    // Receives props from mapping of the buttons in calcDisplay method 
    // of Buttons Component which gets its state from App Component

    onButtonClick = () =>{
        // This will send the value and id of the selected button to Buttons Component
        this.props.onClick(this.props.button.val, this.props.button.id)
    }

    render(){
        
        return (
            
            <div>
                {/* Return a clickable button with associated id and value */}
                <a
                    onClick={this.onButtonClick}
                    id={this.props.button.id}>{this.props.button.val}
                </a>
            </div>

        )
    }

}

export default Button;