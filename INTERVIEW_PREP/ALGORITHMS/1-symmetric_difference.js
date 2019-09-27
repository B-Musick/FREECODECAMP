/*
* Set of elements which are in either of the two sets but not both
* A ∆ B - means symmetric difference between A and B
* A∆B = C = [different values] 
* When comparing to the next array, we use C∆D to compare, not A and B (why we have initial for loop)
*/
function sym(...args) {
  let combArr = args[0];
  for(let i = 0; i < args.length; i+=1){
    // Need to loop through all the arrays and compare the ones next to eachother
    
    if(i===0 || args[i+1]){
      let arrays;
      
      // Save the current two arrays were dealing with
      arrays = [combArr, args[i+1]];

      // Need to remove any doubles which are in each individual array before comparing separate arrays
      let newArgs = arrays.map(arr => {
        return [...new Set(arr)];
      })
      
      // Combine the arrays into one
      let combinedArr = newArgs.reduce((acc, cur) => acc.concat(cur))
      
      // This will hold the values to remove (since doubles)
      let diffVals = [];

      for (let i = 0; i < combinedArr.length; i++) {
        // Go through array, find which have doubles and add those values to array
        // When push to array, need spread operator (...) so its not an array of arrays
        diffVals.push(...combinedArr.filter((val, index) => combinedArr[i] === val && index !== i))
      }
      // https://dev.to/saigowthamr/how-to-remove-duplicate-elements-from-array-javascript-2135
      let removeVals = [...new Set(diffVals)]; // Values to be removed
      
      // Return the values which dont match between the arrays, sort them too
      combArr = combinedArr.filter(val => !removeVals.includes(val)).sort();
      
    }
  
  }
  
  return combArr;

}

console.log(sym([1, 2, 3, 3], [5, 2, 1, 4])); // [3,4,5]
console.log(sym([1, 2, 5], [2, 3, 5], [3, 4, 5])); // [1,4,5]
console.log(sym([1, 1, 2, 5], [2, 2, 3, 5], [3, 4, 5, 5])); // [1,4,5]
console.log(sym([3, 3, 3, 2, 5], [2, 1, 5, 7], [3, 4, 6, 6], [1, 2, 3])) // [ 2, 3, 4, 6, 7 ]

/* LEARNED
* Set to remove duplicates - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
* filter() - return values based on if they match a conditional
* reduce() - accumulator, current value -> can combine values to accumulator
*/