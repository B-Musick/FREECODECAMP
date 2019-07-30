import React from 'react';

import Buttons from './Buttons';
import CalcDisplay from './CalcDisplay';


class App extends React.Component {
    state = {
        operations:[],
        total: 0,
        operators: { 
            '+': (x, y) => { return x + y },
            '-': (x, y) => { return x - y },
            '*': (x, y) => { return x * y },
            '/': (x, y) => { return x / y },
            
        }

    }

    onButtonClick = async (value,id) =>{
        let operationsState = this.state.operations;
       // Gets passed the value and id from the Button component when clicked (passed through Buttons)
       
       if(id==="clear"){
            // If person presses 'CE' then there are no operations
            await this.setState(
                {operations:[]}
            )
        // TODO: You will need to check if two operaters placed beside eachother
        }else if (typeof value==='string' && typeof operationsState[operationsState.length-1]==='string'){
            // If the current value is an operator, and the last value put into 
            // the operations array is an operator, use the current one
            console.log('replacing operator')
            
            await this.setState(prevState => ({
                operations: [...prevState.operations.pop(), value]
            }))
        }else if(!(operationsState[operationsState.length-1]==='string' && value===0) &&
            !(operationsState.length===0 && value===0)){
                
            // If the first number is not going to be 0 then
            // This will add the operations to the array if valid
            await this.setState(prevState => ({
                operations: [...prevState.operations, value]
            }))
        } 
    }

    render(){
        return(
            <div>
                <CalcDisplay operations={this.state.operations} total={this.state.total}/>
                {/* Retrieves the button pressed and the value,id from it */}
                <Buttons onClick={this.onButtonClick}/>    
            </div>

        ) 
    }
    
}

export default App;



// onButtonClick OLD CODE

/** // Need async/await since it takes time to setState, otherwise the value
        // wont be put in the array before it is needed
        // 'value' comes from the Buttons Component which is from the Button onClick
        
        if(id==='equals'){
            // If the total is wanted
            let grandTotal = 0; // Holds the final total
            let currentOperator = ""; // holds the current operator

            // Variables for if multiple digits in a row
            let multiDigits = false;
            let multiDigitStart = 0;
            let multiDigitEnd = 0;
            // console.log(this.state.operations);
            this.state.operations.forEach((val,index)=>{
                if(index===0){
                    // If first value in the array, then set this to the total
                    grandTotal=val;
                }else if(typeof val==='string'){
                    // If value is an operator
                    currentOperator=val;
                }else{
                    // If current value is an integer
                    if(typeof this.state.operations[index+1]=== 'string' ){
                    // If the next value isnt another integer
                    console.log(multiDigits);
                        if(multiDigits){
                            
                            let value = '';
                            // If there are multiple digits and this is the last
                            multiDigits = false;
                            for(let i=multiDigitStart;i<=index;i++){
                                value.concat(this.state.operations[i]);
                                
                            }
                            // Duplicate code, make method
                            if(currentOperator==='+'){
                                grandTotal+=parseInt(value);
                            }else if(currentOperator==='-'){
                                grandTotal-=parseInt(value);
                                
                            }else if(currentOperator==='*'){
                                grandTotal*=parseInt(value);
                            }else if(currentOperator==='/'){
                                grandTotal/=parseInt(value);
                                
                            }
                        }
                        // Duplicate code, make method
                        else if(currentOperator==='+'){
                            grandTotal+=val;
                        }else if(currentOperator==='-'){
                            grandTotal-=val;
                            
                        }else if(currentOperator==='*'){
                            grandTotal*=val;
                        }else if(currentOperator==='/'){
                            grandTotal/=val;
                            
                        }
                    }else{
                     console.log(multiDigits)
                        
                        multiDigits = true;
                        if(this.state.operations[index-1]==='string'){
                            // if previous value an operator, set start to the 
                            // current index which is the first digit
                            multiDigitStart = index;
                        }
                        
                    }
                    // Add to the total using the associated operator from the object list
                    
                }
                
            });
            
            await this.setState(prevState => ({
                // If equals is called, add the '=' and 'total' to end of the array
                // so they can be printed to the screen
                operations: [...prevState.operations, value, grandTotal],
                total: grandTotal
            }));

        }
        else if(id==="clear"){
            // If person presses 'CE' then there are no operations
            
            await this.setState(
                {operations:[0]}
            )
        // TODO: You will need to check if two operaters placed beside eachother
        }else if(this.state.operations[0]===0 && (parseInt(value)!==NaN)){
            // If no values in the array, and inputting the first value, we wannt to
            // remove the 0 which initially in the array and input the first new value
            this.setState({
                operations:[value]}); 
                
        }else if (typeof value==='string' && typeof this.state.operations[this.state.operations.length-1]==='string'){
            // If the current value is an operator, and the last value put into 
            // the operations array is an operator, use the current one
            console.log('replacing operator')
            
            await this.setState(prevState => ({
                operations: [...prevState.operations.pop(), value]
            }))

        
        }else if(!(this.state.operations[this.state.operations.length-1]==='string' && value===0) &&
            !(this.state.operations.length===0 && value===0)){
                
            // If the first number is not going to be 0 then
            // This will add the operations to the array if valid
            await this.setState(prevState => ({
                operations: [...prevState.operations, value]
            }))
        } */