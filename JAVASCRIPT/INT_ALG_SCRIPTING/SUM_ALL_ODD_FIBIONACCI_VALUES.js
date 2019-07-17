function fibionacciOdd(num) {
    let fibArr = [1, 1]
    let count = 0;
    if (num > 1) {
        // If greater than 1 because the first ones are already in the array
        while (count <= num) {
            // Get fibionacci numbers up to the max "num"
            let first = fibArr[fibArr.length - 2]; // Get the second last val
            let second = fibArr[fibArr.length - 1]; // Get the last val
            count = first + second;
            if (count <= num) {
                fibArr.push(count);
            } else {
                break;
            }
        }
    }
    let oddArr = [];

    for (let i = 0; i < fibArr.length; i++) {
        // Get the odd fibionacci numbers
        if (fibArr[i] % 2 == 1) {
            oddArr.push(fibArr[i]);
        }
    }
    return oddArr;
}

function sumFibs(num) {
    // Sum the odd fibs given by fibionacciOdd arr
    let oddFib = fibionacciOdd(num);

    return oddFib.reduce((acc, cur) => { return acc + cur });
}

console.log(sumFibs(75025));