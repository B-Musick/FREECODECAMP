import React from 'react';

class CalcDisplay extends React.Component {
    state = {
    }

    renderValue = () => {
        if (this.props.operations.length === 0) {
            // If there are no operations in progress then display nothing
            return '';  
        }
        else{
            // Return the last value from the array (current value) if there is some
            return this.props.operations[this.props.operations.length-1]
        }

    }

    render() {
            return (
                <div>
                    {/* Ternary operator will either show 0 if no operations, or it will show the operations */}
                    <div id="display">{this.props.operations.length!==0 ? this.props.operations: '0'}</div>
                    {/* // Display all the current operations in progress */}
                    <div>{this.renderValue()}</div>
                </div>
            )
        }
    }

    export default CalcDisplay;