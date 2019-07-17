function uniteUnique(...arr) {
    let argArray = [...arr]; //Spread operator
    let returnArr = [];

    for (let i = 0; i < argArray.length; i++) {

        for (let j = 0; j < argArray[i].length; j++) {
            if (!returnArr.includes(argArray[i][j])) {
                returnArr.push(argArray[i][j]);
            }
        }
    }
    return returnArr;
}

console.log(uniteUnique([1, 3, 2], [5, 2, 1, 4], [2, 1]));
uniteUnique([1, 3, 2], [1, [5]], [2, [4]]) // should return [1, 3, 2, [5], [4]].
uniteUnique([1, 2, 3], [5, 2, 1]) // should return [1, 2, 3, 5].
uniteUnique([1, 2, 3], [5, 2, 1, 4], [2, 1], [6, 7, 8]) // should return [1, 2, 3, 5, 4, 6, 7, 8].


// IMPORTANT IDEAS
// ***************** Spread operator use