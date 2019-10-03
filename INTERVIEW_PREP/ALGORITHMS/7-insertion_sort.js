function insertionSort(array) {
    
    // Start with the first value

    console.log(array)
    for(let i = 0;i<array.length;i++){
        let index;
        let splicedVal;
        if(array[i+1] && (array[i]>array[i+1])){
            // If the array value exists and if the one to the left is bigger than the right
            splicedVal = array.splice(i+1,1); // Splice the value thats smaller than its right value
            let rightPlace = false; // This will determine if value moved to proper order as goes back
            index = i; // Holds index of the value which the spliced value is smaller than originally
            while(!rightPlace){
                // While the value to be moved is not in the right place, move it back
                if(array[index-1]&&array[index-1]<=splicedVal){
                    // If the previous value is smaller than spliced value, then it goes here
                    // Less than or EQUAL to (important, otherwise if have say a 1 
                    // at the start of the array, and your moving a 1 down, it will keep counting
                    // down the index to infinite)
                    array.splice(index,0,...splicedVal);
                    rightPlace = true;
                }else if(index!=0){
                    // If not the right index then check the lower index
                    index--;
                    
                }
            }
            
        }
        
    }
    return array;
}

// test array:
console.log(insertionSort([1, 4, 2, 8, 345, 123, 43, 32, 5643, 63, 123, 43, 2, 55, 1, 234, 92]))