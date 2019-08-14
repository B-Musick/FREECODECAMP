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
    zero, one, two, three, four, five, six, seven, eight, nine,
    decimal, equals, divide, multiply, add, subtract, clear
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

// Used so multiDigit() method will know when it can add values to a negative operator
let negativeVal = false;

// Loops through all the buttons, checks if selected, performs appropriate math
calculatorButtons.forEach(val => {
    val.addEventListener('click', () => {
        let clickedButton = val.value;
        activateDecimal(clickedButton)
        multipleZeroesAtStart(clickedButton); // Prevents multiple zeroes
        multiDigitInteger(clickedButton); // If last value in array is int and so is current
        addValToOperationArray(clickedButton);
        clearCalc(clickedButton); // Clear the calculator if button is CE
        getTotal(clickedButton); // Get the total if equals was pressed
        setDisplay(clickedButton); // Sets the display with the operations and current operation
    })
});

addValToOperationArray = (clickedButton) => {
    // If a multiDigit hasnt occured, then add the single digit to array
    if (!multiDigit&&!decimalActivated) {
        if (clickedButton!=="-" && Number.isNaN(parseFloat(clickedButton)) && Number.isNaN(parseFloat(operations[operations.length-1]))){
            // Prevent multiple operations from being pressed in row (unless negative value)

        }else if(clickedButton==='-' && Number.isNaN(parseFloat(operations[operations.length-1]))){
            // Can only add negative to value if operator is before or array empty
            multiDigit=true;
            negativeVal = true;
            operations.push(clickedButton); // Add the clicked value to array as string
        }else{
            console.log(Number.isNaN(operations[operations.length - 1]))
            operations.push(clickedButton); // Add the clicked value to array as string
        }
        
    }
}

setDisplay = (buttonVal) => {
    // Set the display from the operations/numbers in the array
    let displayVal = '';

    if (operations.length !== 0 && buttonVal!=="=") {
        // If there are operations/numbers, then set display to show them
        operations.forEach(val => {
            displayVal += val;
        })
    } else if (operations.length !== 0 && buttonVal === "=") {
        // if button is equals, just display total not the whole equation
        // When equals was pressed, deleted all values in array and left the total
        displayVal = operations[0];
    }else{
        // If no operations occuring, set default to 0
        displayVal = '0';
    }

    // Show all the operations
    display.textContent = displayVal;
    // Show the current operation or number
    currentOperationDisplay.textContent = operations[operations.length - 1];
}

clearCalc = (buttonVal) => {
    // If button clicked is CE then clear the calculator
    if (buttonVal === "CE") {
        operations = [];
        console.log('Operations cleared')
    }
};

getTotal = (buttonVal) => {
    // Get the total value and set to display
    
    let total = 0;
    if (buttonVal === '=') {
        // If '=' clicked then return the total
        total += parseFloat(operations[0]); // Set total to first value in array
        let currentOperator = ""; // Holds next operator to be used

        for (let i = 1; i < operations.length; i++) {
            if (parseFloat(operations[i])) {
                // If current operations[i] is a number, then use operator between
                total = performOperation(currentOperator,total, parseFloat(operations[i]));
                console.log(total)
            } else if (operations[i] !== '=') {
                // Sets next operator to be used
                currentOperator = operations[i];
                // currentOperator = operationalValues[operations[i]];
            }
        }
        // total is used so setDisplay can set it to screen when equals is pressed
        operations = []; // Delete the values in the array leave only total, so can add to this total after
        operations.push(total); 
        
        
    }
}

multiDigitInteger = (buttonVal) => {
    // Used to check if an integer with multiple digits is forming
    // Doesnt act when decimal is activated
    
    if ((parseInt(operations[operations.length - 1]) && !Number.isNaN(parseInt(buttonVal)) && !decimalActivated)) {
        // Had to use Number.isNaN otherwise it was seeing 0 as a falsey, so wasnt adding 0 to a value like 10.5
        // it was separating it and not making multidigit (like ["1", "0"])
        console.log('multidigit')
        // If last value in array is an integer and so is the current, then 
        // multidigit integer is forming so add to that
        operations[operations.length - 1] += buttonVal;
        multiDigit = true;
        negativeVal = false;
    } else if (negativeVal && Number.isNaN(parseFloat(buttonVal))){
        // If negativeVal made, but another operation is added before number/after negative,
        // Then cut out the operation and the negative val (set to false)
        operations.splice(operations.length - 2, 2, buttonVal);
        negativeVal=false;
        multiDigit=false;
    }
    
    else if(negativeVal && !Number.isNaN(parseFloat(buttonVal))){
        // If negativeVal is created (in addValToOperation()), and the current button isnt an operator
        // then append the number to the negative to make it a negative number
        operations[operations.length - 1] += buttonVal;
        multiDigit = true;
        negativeVal = false;
    } else {
        multiDigit = false;
    }
    console.log(operations)
}

multipleZeroesAtStart = (clickedButton) => {
    // Make sure value doesnt start with multiple zeroes
    if (operations[operations.length - 1] === '0' && clickedButton === '0' && !decimalActivated) {
        // If the last value in array is 0,and not a decimal, then remove it and add current
        operations.pop();
    }
}

activateDecimal=(clickedButton)=>{
    
    // Only this acts when decimal is activated
    if (clickedButton === '.' && !decimalActivated && !Number.isNaN(parseFloat(operations[operations.length - 1]))){
        // If current value is a decimal and one not already activated, and last 
        // value not an operation (would equal NaN), then append to last value
        
        decimalActivated=true;
        multiDigit = false;
        operations[operations.length - 1] += clickedButton;
    } else if (clickedButton === '.' && operations[operations.length-1].includes('.')){
        // If try to add multiple decimals, dont include the current one

    }else if(decimalActivated && clickedButton!=='.' && !Number.isNaN(parseFloat(clickedButton))){
        
        // If there isnt already a decimal, and clickedButton is a number and this is a decimal val
        // append the integer to the last value in array
        operations[operations.length-1]+=clickedButton;
        
    } else if (decimalActivated && !parseFloat(clickedButton)){
        
        // If the current clickedButton is an operation, then deactivate decimal
        decimalActivated = false;
    }
}

performOperation=(operation,total,nextVal)=>{
    if(operation==='+'){
        return total+=nextVal
    } else if (operation === '-') {
        return total -= nextVal
    } else if (operation === '*') {
        return total *= nextVal
    } else if (operation === '/') {
        return total /= nextVal
    }
}
