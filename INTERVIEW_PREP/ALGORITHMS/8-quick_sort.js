function quickSort(array) {

    if (array.length > 1) {
        // Create pivot val from first value and rest of the array in newArr
        let [pivotVal, ...newArr] = array; 

        // Create arrays which will hold values depending if to left or right of pivot
        let leftArr = [], rightArr = [];

        // Go through each value and put left or right of pivot
        newArr.forEach(val => val < pivotVal ? leftArr.push(val) : rightArr.push(val));

        // Recursively call, will return values when 0 or 1 values in the array
        return quickSort(leftArr).concat(pivotVal).concat(quickSort(rightArr));
    } else {
        // If there is only one value or none in the array, return it (since recursive)
        return array;
    }

}

// test array:
console.log(quickSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));

// https://www.youtube.com/watch?v=S1qHWjP1hb0