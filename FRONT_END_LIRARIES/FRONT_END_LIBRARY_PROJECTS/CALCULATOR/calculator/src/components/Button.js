import React from 'react';

class Button extends React.Component{
    state = {}
    // Receives props from mapping of the buttons in calcDisplay method 
    // of Buttons Component which gets its state from App Component

    onButtonClick = () =>{
        console.log(this.props.button.val)
        this.props.onClick(this.props.button.val)
    }

    render(){
        
        return (
            
            <div>
                <a
                    onClick={this.onButtonClick}
                    id={this.props.button.id}>{this.props.button.val}
                </a>
            </div>

        )
    }

}

export default Button;