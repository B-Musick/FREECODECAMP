function addTogether(...arg) {
    // Sums two arguments together
    // If only one then return function that expects one argument and returns the sum
    if (arg.length === 2 && arg.every((val)=>typeof val === 'number')){
        return arg[0]+arg[1];
    } else if (arg && arg.every((val) => typeof val === 'number') && typeof arg !== 'string'){
        return function(val){
            if (!Array.isArray(val) && !Array.isArray(arg[0])){
                return parseInt(arg) + parseInt(val);
            }
            
        };
    }else{
        return undefined;
    }
    
}

console.log(addTogether(2, 3));

// Spread operator as argument puts arguments in array to use
console.log(addTogether(2)(3));// should return 5.
console.log(addTogether("http://bit.ly/IqT6zt")); // should return undefined.
console.log(addTogether(2, "3")); // should return undefined.
console.log(addTogether(2)([3]));// should return undefined