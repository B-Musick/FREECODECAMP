// FACTORIAL
let fact = (n) => {
    return n !== 0 ? fact(n - 1) * n : 1;
}

fact(4) // 24

// Non recursive
let fib = (max) => {
    let fibArr = [0,1];
    
    while(fibArr[fibArr.length-1] <= max){
        lastVal = fibArr[fibArr.length-1];
        secLastVal = fibArr[fibArr.length-2];
        fibArr.push(lastVal+secLastVal);
    }
    if (fibArr[fibArr.length - 1]>max){
        fibArr.pop()
    }
    return fibArr;  
}

let fibRecursive = (array, max) => {

    
    // let newVal = array[0]+array[1]
    // console.log(newVal);
    // return newVal< max ? fibRecursive([...array],max).push(newVal) : [];
}

console.log(fibRecursive([0,1],8));
