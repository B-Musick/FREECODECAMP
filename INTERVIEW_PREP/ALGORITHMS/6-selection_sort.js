function selectionSort(array) {
    // change code below this line
    let index = 0;

    while(index < array.length){
        let valueToMove = array[index]; // Start the lowest value as the first in the loop
        let indexToMove = 0; // Start with the first index
        for(let i = index+1;i<array.length;i++){
            // Go through all the values starting after the current index iteration
            if(array[i]<valueToMove){
                
                valueToMove=array[i];
                indexToMove=i;
                
            }
        }
        if(indexToMove>0){
            // Had to make sure it wasnt the first value being moved other wise it would
            // Splice in and screw up the order
            let spliced = array.splice(indexToMove, 1); // Splice out lowest value
            array.splice(index, 0, ...spliced); // Splice in the value to the start of where looped from
        }

        index++;
    }
    // change code above this line
    return array;
}

// test array:
console.log(selectionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]));