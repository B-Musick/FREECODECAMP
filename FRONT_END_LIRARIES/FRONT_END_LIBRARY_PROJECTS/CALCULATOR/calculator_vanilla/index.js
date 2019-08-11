let display = document.getElementById('display');
let currentOperationDisplay = document.getElementById('current-operation');

let operations = [];
/***************************** INTEGERS  **************************************/
let zero = document.getElementById('zero');
let one = document.getElementById('one');
let two = document.getElementById('two');
let three = document.getElementById('three');
let four = document.getElementById('four');
let five = document.getElementById('five');
let six = document.getElementById('six');
let seven = document.getElementById('seven');
let eight = document.getElementById('eight');
let nine = document.getElementById('nine');

/************************ OPERATIONAL BUTTONS  ********************************/
let equals = document.getElementById('equals');
let divide = document.getElementById('divide');
let multiply = document.getElementById('multiply');
let add = document.getElementById('add');
let subtract = document.getElementById('subtract');
let decimal = document.getElementById('decimal');
let clear = document.getElementById('clear');

/**************************** VARIABLES ***************************************/

// Hold the DOM handles to access buttons
let calculatorButtons = [
    zero,one,two,three,four,five,six,seven,eight,nine,
    decimal,equals,divide,multiply,add,subtract,clear
]

// Used to perform the operations in the getTotal() method
let operationalValues = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
}

// Will let know if the loop of calcButtons should push value or not
// Turned on and off by multiDigitInteger()
let multiDigit = false; 

// This will let it be know decimal value is occuring
let decimalActivated = false;

// Loops through all the buttons, checks if selected, performs appropriate math
calculatorButtons.forEach(val=>{
    val.addEventListener('click',()=>{
        let clickedButton = val.value;
        multipleZeroesAtStart(clickedButton); // Prevents multiple zeroes
        multiDigitInteger(clickedButton); // If last value in array is int and so is current
        addValToOperationArray(clickedButton);
        clearCalc(clickedButton); // Clear the calculator if button is CE
        getTotal(clickedButton); // Get the total if equals was pressed
        setDisplay(clickedButton); // Sets the display with the operations and current operation
    })
});

addValToOperationArray=(clickedButton)=>{
    // If a multiDigit hasnt occured, then add the single digit to array
    if (!multiDigit) {
        operations.push(clickedButton); // Add the clicked value to array as string
    }
}

setDisplay=(buttonVal)=>{
    // Set the display from the operations/numbers in the array
    let displayVal = '';

    if(operations.length!==0){
        // If there are operations/numbers, then set display to show them
        operations.forEach(val => {
            displayVal += val;
        })      
    }else{
        // If no operations occuring, set default to 0
        displayVal='0';
    }

    // Show all the operations
    display.textContent = displayVal;
    // Show the current operation or number
    currentOperationDisplay.textContent = operations[operations.length-1];
}

clearCalc=(buttonVal)=>{
    // If button clicked is CE then clear the calculator
    if(buttonVal==="CE"){
        operations = [];
        console.log('Operations cleared')
    }
};

getTotal=(buttonVal)=>{
    // Get the total value and set to display
    let total=0;
    if(buttonVal==='='){
        // If '=' clicked then return the total
        total+=parseFloat(operations[0]); // Set total to first value in array
        let currentOperator = ""; // Holds next operator to be used

        for(let i=1; i<operations.length;i++){
            if(parseFloat(operations[i])){
                // If current operations[i] is a number, then use operator between
                total = currentOperator(total,parseFloat(operations[i]));
            } else if (operations[i]!=='='){
                // Sets next operator to be used
                currentOperator = operationalValues[operations[i]];
            }
        }
        
        operations.push(total);
        display.textContent = operations;
    }
}

multiDigitInteger=(buttonVal)=>{
    // Used to check if an integer with multiple digits is forming
    if(parseFloat(operations[operations.length-1])&&parseInt(buttonVal)){
        // If last value in array is an integer and so is the current, then 
        // multidigit integer is forming so add to that
        operations[operations.length-1]+=buttonVal;
        multiDigit = true;
    }else{
        multiDigit = false;
    }
}

multipleZeroesAtStart=(clickedButton)=>{
    // Make sure value doesnt start with multiple zeroes
    if(operations[operations.length-1]==='0'&&clickedButton==='0'&&!decimalActivated){
        // If the last value in array is 0,and not a decimal, then remove it and add current
        operations.pop();
    }
}

