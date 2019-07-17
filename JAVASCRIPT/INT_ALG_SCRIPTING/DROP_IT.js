function dropElements(arr, func) {
    // Drop them elements.
    let count = 0;
    while (!func(arr[count])) {
        count++;
    }

    let array = arr.slice(count);
    return array;
}

dropElements([1, 2, 3], function (n) { return n < 3; });
dropElements([1, 2, 3, 4], function (n) { return n >= 3; }) // should return [3, 4]