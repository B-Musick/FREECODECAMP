// noprotect

function smallestCommons(arr) {
    let firstVal, lastVal; // Hold the initial and end values
    let rangeArr = []; // This will hold the range of numbers between and including two given
    let counter; // set to first value in array
    

    // Save first and last values
    if (arr[0] < arr[1]) {
        firstVal = arr[0];
        lastVal = arr[1];

    } else {
        firstVal = arr[1];
        lastVal = arr[0];

    }
 
    // Set up the array
    for (let i = firstVal; i <= lastVal; i++) {
        rangeArr.push(i);
    }
    
    counter = lastVal * lastVal; // Set counter to start at highest multiple

    let allCommonMultiple = false; // Will set true when find a number evenly divisible by all
    // Check for the lowest common multiple for all values

    while (!allCommonMultiple) {
        counter++;
        allCommonMultiple = rangeArr.every(val => counter%val===0);
        
        // for (let i = lastVal; i >= firstVal; i--) {
        //     // Count down, so if biggest number not divisible, then none are
        //     // Go through the array and see if all divisible
        //     if (counter % i === 0) {
        //         // If is evenly divided, then continue
        //         continue;
        //     } else {
        //         allCommonMultiple = false;
        //         counter += lastVal; // Can increase by lastVal because start counting at 
        //         // this and know it can only be divisible by adding to itself, this
        //         // decreases time
        //         break; // Break for loop
        //     }
        // }
    }
    return counter; // Return the number that wins
}

// function smallestCommons(arr) {
//     let firstVal, lastVal; // Hold the initial and end values
//     let rangeArr = []; // This will hold the range of numbers between and including two given
//     let counter; // set to first value in array

//     if (arr[0] < arr[1]) {
//         firstVal = arr[0];
//         lastVal = arr[1];

//     } else {
//         firstVal = arr[1];
//         lastVal = arr[0];

//     }

//     // Set up the array
//     for (let i = firstVal; i <= lastVal; i++) {
//         rangeArr.push(i);
//     }
//     counter = lastVal * lastVal;
//     let allCommonMultiple = false; // Will set true when find a number evenly divisible by all
//     // Check for the lowest common multiple for all values


//     while (!allCommonMultiple) {
//         allCommonMultiple = true; // Set to true where if find a non divisor, set to false

//         for (let i = lastVal; i >= firstVal; i--) {
//             // Count down, so if biggest number not divisible, then none are
//             // Go through the array and see if all divisible
//             if (counter % i === 0) {
//                 // If is evenly divided, then continue
//                 continue;
//             } else {
//                 allCommonMultiple = false;
//                 counter += lastVal; // Can increase by lastVal because start counting at 
//                 // this and know it can only be divisible by adding to itself, this
//                 // decreases time
//                 break; // Break for loop
//             }
//         }
//     }
//     return counter; // Return the number that wins
// }

/*********************FINAL SOLUTION*********************************** */

function smallestCommons(arr) {
    let firstVal, lastVal;
    let rangeArr = [];
    let counter;
    arr = arr.sort();
    if (arr[0] < arr[1]) {
        firstVal = arr[0];
        lastVal = arr[1];
    } else {
        firstVal = arr[1];
        lastVal = arr[0];
    }
    rangeArr = setArray(firstVal, lastVal);
    counter = lastVal * lastVal;
    let allCommonMultiple = false;

    while (!allCommonMultiple) {

        counter += lastVal;
        allCommonMultiple = rangeArr.every(val => counter % val === 0);

    }
    return counter;
}

function setArray(first, last) {
    let arr = [];
    for (let i = first; i <= last; i++) {
        arr.push(i);
    }
    return arr;
}





console.log(smallestCommons([23, 18])); // should return 6056820.



console.log(smallestCommons([1, 5]));// should return 60.
console.log(smallestCommons([5, 1]));// should return 60.
console.log(smallestCommons([2, 10])); // should return 2520.
console.log(smallestCommons([1, 13]));  //should return 360360.
console.log(smallestCommons([23, 18])); // should return 6056820.

/******************************* THINGS LEARNED *****************************
 * rangeArr.every(val => counter % val === 0);
 * .every() takes all val in the array and applies the conditional until false
 * 
*/

