function steamrollArray(arr) {

    //I'm a steamroller, baby
    let containsArray = false;
    while(!containsArray){
        
        containsArray = arr.every(x => !Array.isArray(x)); // If none of the values are an array then done
        if(!containsArray){
            // If one of the values is an array, then go through and 'flatten'
            arr = arr.reduce((acc,cur) => acc.concat(cur), []);
        }
    }
    
    return arr;
    //return flatten(arr);
}
// function flatten(arr) {
//     return arr.reduce((acc, val) => typeof val == Array ? acc.concat(flatten(val)) : acc.concat(val), []);
// };



console.log(steamrollArray([1, [2], [3, [[4]]]]));
console.log(steamrollArray([[["a"]], [["b"]]]));// should return ["a", "b"].   
console.log(steamrollArray([1, [], [3, [[4]]]])); // should return [1, 3, 4].
console.log(steamrollArray([1, {}, [3, [[4]]]])); // should return [1, {}, 3, 4].

/***************************** THINGS LEARNED ******************************** 
 * reduce((acc,currentVal) => action , accInitialValue) --> Learned that
 * reduce can have an initial value set for acc after the action occuring to 
 * accumulate all the values in the array. So in this example I concatenated all
 * the values from the array into an empty array to get rid of any inner arrays
 * 
 * .every((arg) => action) will take in every individual value in the array as
 * its 'arg' and a conditional as its action and if one of them doesnt, match then
 * returns false, if all match then return true
*/