function Comparator(a, b) {
    // Used to sort the arrays by the words in each array
    if (a[1] < b[1]) return -1;
    if (a[1] > b[1]) return 1;
    return 0;
}

function updateInventory(arr1, arr2) {
    
    let returnArr=[];
    // All inventory must be accounted for or you're fired!

    // Get all values that match
    arr1.forEach((item,index)=>{

        let itemMatched=false; // Used to add any unmatched values from array1 to return array

        arr2.forEach((newItem)=>{
            
            if (item[1] === newItem[1]){
                // If any values match, then combine values and push them to the return array
                returnArr.push([item[0]+newItem[0],item[1]]) 
                itemMatched=true;
            }
        })

        if(!itemMatched){
            // If value from arr1 didnt match any in arr2, add the value from arr1 to return array
            returnArr.push(item);
        }
    });
    
    // GO THROUGH VALUES IN SECOND ARRAY AND COMPARE THEM TO THOSE CURRENTLY IN RETURN ARRAY
    // IF ANY DONT MATCH THEN ADD THEM TO THE RETURN ARRAY
    arr2.forEach(arr2=>{
        let matched = false;
        returnArr.forEach(arr=>{
            // If match then change the boolean to true
            if(arr2[1]===arr[1]){
                matched=true;
            }
        });
        
        if(!matched){
            // If didnt match any from array1 then add the value from arr2 to return array
            returnArr.push(arr2);
        }
    }

    )
    // Use the Comparator function which tells to sort by word in array 
    return returnArr.sort(Comparator);
    
   
}

// Example inventory lists
var curInv = [
    [21, "Bowling Ball"],
    [2, "Dirty Sock"],
    [1, "Hair Pin"],
    [5, "Microphone"]
];

var newInv = [
    [2, "Hair Pin"],
    [3, "Half-Eaten Apple"],
    [67, "Bowling Ball"],
    [7, "Toothpaste"]
];

updateInventory(curInv, newInv);

