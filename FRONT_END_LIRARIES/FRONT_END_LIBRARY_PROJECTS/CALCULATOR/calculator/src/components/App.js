import React from 'react';

import Buttons from './Buttons';
import CalcInput from './CalcInput';

class App extends React.Component {
    state = {
        operations:[],
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
            { id: 'clear', val: "" }, // When clear button pressed, should clear input and output setting to 0
            { id: 'decimal', val: "." }

        ]
    }

    onInputSubmit = (value) =>{
        // This will take the value and operation and attach it to an array
        this.setState(prevState =>({
            items: [...prevState,value]
        }))
    }
    render(){
        return(
            <div>
                {/* Pass in onSubmit method to item input to return input from
                CalcInput which will take the value in passed up from the CalcInput 
                child component*/}
                <CalcInput onSubmit={this.onInputSubmit}/>
                <Buttons buttons={this.state.buttons}/> 
                
            </div>

        ) 
    }
    
}

export default App;