function mergeSort(array) {
    if(array.length===1){
        // If there is only one value in the array put it into stack
        return array;
    }
    // Divide the array in two
    let separator = Math.floor(array.length/2);
    
    // Slice the array into two arrays
    let arrOne = array.slice(0,separator);
    let arrTwo = array.slice(separator);

    // Call mergeSort to divide the arrays even smaller
    arrOne = mergeSort(arrOne);
    arrTwo = mergeSort(arrTwo);

    // When th
    return merge(arrOne, arrTwo);
}

function merge(arr1, arr2){
    // This will take the smaller arrays and merger them
    let returnArr = []; // Holds the merged arrays
    
    while(arr1.length>0 && arr2.length>0){
        // While the original arrays still contain values to be merged
        
        // If first val in first array greater than first in second arr, splice out from arr2 and put it in new arr
        // This will order the values between the two arrays
        (arr1[0] > arr2[0]) ? returnArr.push(...arr2.splice(0, 1)): returnArr.push(...arr1.splice(0, 1));
    }

    // Now only one array will have elements so loop through these and add to end of arr3
    while (arr1.length > 0 ){
        returnArr.push(...arr1.splice(0, 1));
    }
    while (arr2.length > 0) {
        returnArr.push(...arr2.splice(0, 1));
    }

    return returnArr;
}

// test array:
console.log(mergeSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));