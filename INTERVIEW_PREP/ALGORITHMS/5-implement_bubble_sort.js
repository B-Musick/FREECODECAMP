function bubbleSort(array) {
    // change code below this line

    let switched = true; // If no switches occur, then sorted

    while(switched){
        let index = 0; // This will determine where to loop from
        switched = false; // If this stays false that means the array is sorted
        for(let i = index; i<array.length;i++){
            // Loop through all values in the array
            if(array[i+1] && array[i+1]<array[i]){
                // If the right value is less than the left, then switch them
                let spliced = array.splice(i+1,1); // Take the right value
                array.splice(i,0,...spliced); // Switch it to the left
                if(!switched){
                    // If first value is switched, then only loop from here
                    index = i;
                }
                switched = true; // Continue the loop
                
                
                
            }
        }
        console.log(switched);
    }


    // change code above this line
    return array;
}


// test array:
console.log(bubbleSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));

// PERFORMANCE
// https://stackoverflow.com/questions/313893/how-to-measure-time-taken-by-a-function-to-execute