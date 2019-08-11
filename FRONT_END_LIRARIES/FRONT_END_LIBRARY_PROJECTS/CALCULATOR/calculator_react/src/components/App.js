import React from 'react';

import Buttons from './Buttons';
import CalcDisplay from './CalcDisplay';


class App extends React.Component {
    state = {
        operations:[],
        total: 0,
        operators: { 
            '+': (x, y) => x + y ,
            '-': (x, y) => x - y ,
            '*': (x, y) => x * y ,
            '/': (x, y) => x / y ,
            
        },
        nextValNegative: false, // Used to set value to negative
        decimalActivated: false, // Keeps track of if decimal button is pressed
        decimalVal: 0, // Keeps track of the decimal value
        previousDecimal: false // This will keep track of when decimal pressed, 
                                // if there was a value already at the end of the array which the decimal is added to

    }

    spliceInVal(val) {
        // Splice in value to array
        let newArray = [...this.state.operations];
        newArray.splice(newArray.length - 1, 1, val);

        this.setState({
            operations: [...newArray]
        })
    }

    changePrevOpState(val){
        this.setState(prevState=>({
            operations: [prevState.operations,val]
        }))
    }

    onButtonClick = async (value,id) =>{
        let operationsState = this.state.operations; // Holds all the current operations
       // Gets passed the value and id from the Button component when clicked (passed through Buttons)
       if (id === 'decimal') {
            //If decimal is pressed, then add decimal to the last value in array
            if(!this.state.decimalActivated){
                // If not already decimal actived (cant have two in a row)
                console.log('Decimal activated')
                if (typeof operationsState[operationsState.length - 1] === 'string' ||
                    typeof operationsState[operationsState.length - 1] === 'undefined') {
                    // If the last operation is a type of string then add 0 to the left of decimal,
                    // and dont pull anything from the last array
                    await this.setState(prevState => ({
                        decimalActivated: true,
                        decimalVal: "0."

                    }));
                    console.log(
                        'set 0 before decimal'
                    )

                } else {
                    // If the last operation was a number, then well add the decimal to that number

                    await this.setState(prevState => ({
                        // 
                        previousDecimal: true,
                        decimalActivated: true,
                        decimalVal: prevState.operations[prevState.operations.length - 1] += "."

                    }));
                }
            }else{
                // Otherwise do nothing if decimal activated already
                console.log(
                    "Decimal already activated"
                )
            }
        }else if (this.state.decimalActivated && typeof value ==='string' && id !== 'equals'){
        //    If this is a decimal and another operation is pressed, then add decimal to array
            console.log('Decimal activated and operation')
            if(this.state.decimalVal[this.state.decimalVal.length-1] === '.'){
                
                // If there is no value added after the decimal, then add 0 so its not ('3.')
                await this.setState(prevState => ({
                    decimalVal: prevState.decimalVal+"0"
                }));
                console.log('Set zero after decimal');
            }
           
            if(this.state.previousDecimal){
                // If the decimal was added to a value already in the array (ie if "1." is input, 
                // need to remove and put whole new this.state.decimalVal in)
                // we need to remove the previous one and add the new value
                // As well need to set the booleans to false
                
                // Need to splice out the old operator, then add in the new one
                // Remember that the following would return the removed item if saved to variable
                // so dont want to save it
                console.log(this.state.operations)
                this.changePrevOpState(value);
                
              

                await this.setState({
                    previousDecimal: false,
                    decimalActivated: false,
                });

                console.log("Now the state of operations is: "+this.state.operations)

            }else{
                // If the decimal was clicked when there was no previous val, then 0 was added
                // So we just need to add the decimal value to the previous state
                await this.setState(prevState => ({
                    previousDecimal: false,
                    decimalActivated: false,
                    operations: [...prevState.operations, this.state.decimalVal,value]
                }));
                console.log(this.state.operations)
            }

       }
       else if (this.state.decimalActivated && id !== 'equals'){
           console.log('Adding integer to current decimal number')
        //    If decimal is activated, need to add values to the current number

           await this.setState(prevState => ({
               decimalActivated: true,
               decimalVal: prevState.decimalVal+= value + "",
               operations: prevState.operations
           }));
           /* Add in the current decimal */
           let newArray = [...this.state.operations];
           // Need to splice out the old decimal val, then add in the new one
           // If dont do this, when we press equals, the decimal wont be placed in the array
           // thus any decimal made just before pressing equals would not be incorporated

           // Remember that the following would return the removed item if saved to variable
           // so dont want to save it
           newArray.splice(newArray.length - 1, 1, this.state.decimalVal);

           await this.setState(prevState => ({
               // Set the new operations array to the newArray with old operation removed
               operations: [...newArray]
           }))
           console.log("Now the number is "+this.state.decimalVal)
           
       }
        else if (id === 'equals' && (""+this.state.operations[this.state.operations.length - 1]).endsWith('.')) {

            await this.setState(prevState => ({
                decimalVal: prevState.decimalVal += "0",
               

            }));
            console.log(this.state.decimalVal)
           let newArray = [...this.state.operations];
           // Need to splice out the old decimal val, then add in the new one
           // If dont do this, when we press equals, the decimal wont be placed in the array
           // thus any decimal made just before pressing equals would not be incorporated

           // Remember that the following would return the removed item if saved to variable
           // so dont want to save it
           newArray.splice(newArray.length - 1, 1, this.state.decimalVal);
           
           await this.setState(prevState => ({
               
               operations: [...newArray]

           }));
            console.log('add 0 to ends')
        }
       if(id === 'equals'){
           operationsState = this.state.operations; // Reset the operations state since added 0 to end possibly
           console.log(this.state.operations)
            //    Set the initial value of grandTotal to the first value in array
            var grandTotal = this.state.operations[0] ? this.state.operations[0] : 0; // Holds the final total
            var currentOperator = ""; // holds the current operator
            console.log("Equals button was hit, grandTotal set to first value in array "+grandTotal);
            
            // If the equals button is pressed
            for(let i=1;i<operationsState.length;i++){
                // Loop through all the operations/numbers
                // Dont include the last value since the equals sign
                if(typeof operationsState[i]==='string'){
                    // Set the currentOperator
                    currentOperator = operationsState[i];
                    console.log("Current value from array "+currentOperator)
                }else{
                    // Take the grandtotal, apply it as 'x' and the current number from the array as 'y'
                    // it will perform the associated operation (currentOperator) that was between them
                    
                    grandTotal = this.state.operators[currentOperator](grandTotal,operationsState[i]);
                    // Set this value to the state (need to await otherwise doesnt get 
                    // finished calculating quick enough)
                    
                    
                }
                

            }
            await this.setState(prevState => ({
                    // Add equals sign to the end of the array, as well as total
                    // Want it to be printed to 'Display' in the CalcDisplay
                    total: grandTotal,
                    operations: [...prevState.operations, value, grandTotal]
                }))
                console.log('Set grandTotal to the state total '+grandTotal+" = "+this.state.total)

       }
       else if(id==="clear"){
            // If person presses 'CE' then there are no operations
            await this.setState(
                {operations:[]}
            )
        // TODO: You will need to check if two operaters placed beside eachother
        }
        else if (typeof value==='string' && typeof operationsState[operationsState.length-1]==='string' && !this.state.decimalActivated){
            // If the current value is an operator, and the last value put into 
            // the operations array is an operator, use the current one
            console.log('replacing operator')
            if(value==='-'){
                
                await this.setState({
                    // If it is a negative then add this to the next value, let state know
                    nextValNegative: true
                })
                
            }else{
                // Need to splice create a new array deep copy of state
                let newArray = [...this.state.operations];
                // Need to splice out the old operator, then add in the new one
                // Remember that the following would return the removed item if saved to variable
                // so dont want to save it
                newArray.splice(newArray.length - 1, 1, value);

                await this.setState(prevState => ({
                // Set the new operations array to the newArray with old operation removed
                    operations: [...newArray]
                }))
            }

            console.log(this.state.operations+" operations")
        }else if(!(operationsState[operationsState.length-1]==='string' && value===0) &&
           !(operationsState.length === 0 && value === 0) && !this.state.decimalActivated){
                
            // If the first number is not going to be 0 then
            // This will add the operations to the array if valid
            if(this.state.nextValNegative){
                // If this is supposed to be a negative value, set it as such
                await this.setState(prevState => ({
                     operations: [...prevState.operations, -value],
                     nextValNegative:false
                 }))
                 console.log(this.state.operations)
            }else{
                await this.setState(prevState => ({
                     operations: [...prevState.operations, value]
                }))
            }

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
                                                   
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          

                                         