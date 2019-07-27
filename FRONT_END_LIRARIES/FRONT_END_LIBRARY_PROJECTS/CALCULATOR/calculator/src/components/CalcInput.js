import React from 'react';

class CalcInput extends React.Component{
    state = {value: ''};

    onInputSubmit = () => {
        // Call method coming from Buttons Component through props
        this.props.onSubmit(this.state.item);
    };

    render(){
        return (
            <div>
                {/* All values will be displayed */}
                <div 
                    id="display"
                    type="text"

                ></div>
            </div>
            
        ) 
    }
}

export default CalcInput;