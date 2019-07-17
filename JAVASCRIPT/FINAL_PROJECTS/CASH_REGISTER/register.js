function checkCashRegister(price, cash, cid) {
    // Accepts purchase price, then cash given, change in drawer
    // CID is 2D array listing available currency
    // Return object with status key and change key
    let coins = {
        0: .01,
        1: .05,
        2: .1,
        3: .25,
        4: 1.00,
        5: 5.00,
        6: 10,
        7: 20,
        8: 100
    };
    // Get total change in drawer

    
    // Here is your change, ma'am.
    // Takes price, then payment method, and cash in drawer

    /* Return {status: "INSUFFICIENT_FUNDS", change: []} if cash-in-drawer is 
    less than the change due, or if you cannot return the exact change.
    * So need to add the total amounts together in the drawer
    */
    
    // Get the total amount of change in the drawer
    let total = cid.reduce((acc,change)=>acc+=change[1],0);

    // Get total to two decimal places
    total=(total*100)/100;

    // Get the amount of change is needed from the purchase (cash given ,minus price)
    let change = cash-price;

    if (total === change) {
    // If there is just exact change
        return { status: "CLOSED", change: cid };
    }else if(total<change){
        return {
            status: 'INSUFFICIENT_FUNDS',
            change: []
        }

    }else if(total!=change){
        let returnChange = [];

        let count = cid.length - 1; // Used to go through all values from Twenty to Penny

        while (change > 0 && count >= 0) {
            // While still change left to find, or no more bill types to check


            if (change - cid[count][1] > 0 && cid[count][1] > 0) {
                // See if all the money of that kind can be used
                // Make sure the money is actually in the drawer
                // If can then use all of it and add it to the array, take it off the change left to give
                returnChange.push([cid[count][0], cid[count][1]]);
                change -= cid[count][1]; // Take this off the amount of change left to give
                count -= 1;

            } else if (change / coins[count] > 0 && cid[count][1] > 0) {
                // If not able to give all of that one bill type, see how much you can give
                // if(cid[count]>=1){
                // If the coinage to be given isnt a decimal
                let remainder = change % coins[count]; // Get the remainder left after dividing
                let newChange = change - remainder; // New amount to divide into 
                let divisor = newChange / coins[count];
                
                // Amount to place in the change
                let amount = coins[count] * divisor;
                // Place the certain amount of that change into the array
                if(amount>0){
                    returnChange.push([cid[count][0], amount]);
                    change = Math.round(remainder * 100) / 100; // Keep it to two decimal places
                   
                    
                }
                count -= 1; // on to the next 
                
                
                
                // }
            }else{
                count-=1;
            }
            
            
        

    }
        if (change != 0) {
            // If couldnt get exact change
            return {
                status: 'INSUFFICIENT_FUNDS',
                change: []
            }
        } else {
            
            return { status: "OPEN", change: returnChange };
        }
    // else if(total<change){
    //     return {
    //         status: 'INSUFFICIENT_FUNDS',
    //         change: []
    //     }
    // }
    }else{
        return {
            status: 'INSUFFICIENT_FUNDS',
            change: []
        }
    }
}
  
    
//     // Return {status: "CLOSED", change: [...]} with cash-in-drawer as the 
//     //value for the key change if it is equal to the change due.



//     // Otherwise, return {status: "OPEN", change: [...]}, with the change 
//     //due in coins and bills, sorted in highest to lowest order, as the value 
//     //of the change key.


//     // Return object with {status: ""} and {change:""}
//     return change;



console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])); //should return an object.
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])); //should return { status: "OPEN", change: [["QUARTER", 0.5]] }.
console.log(checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])); //should return { status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]] } 
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])); //should return { status: "INSUFFICIENT_FUNDS", change: [] }.; 
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])); //should return { status: "INSUFFICIENT_FUNDS", change: [] }.; 
// console.log(checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])); //should return { status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]] }.