function whatIsInAName(collection, source) {
    // What's in a name?
    var arr = [];
    // Only change code below this line
    collection.forEach(function (items) {
        // Go through each object in the collection array
        console.log(Object.keys(source).length)
        if (Object.keys(source).length == 1) {

            for (let item in items) {
                // Go through each property in the object
                if (items[item] == source[item]) {
                    arr.push(items);
                    break;
                }
            }
        } else if (Object.keys(source).length > 1) {
            // If the source were taking from is greater than 1
            // Need to match all the objects
            let addToArr = true; // Determines if all properties match in objects

            for (let item in source) {
                if (items[item] != source[item]) {
                    // If one property doesnt match in the source then dont add
                    addToArr = false;
                }
            }
            if (addToArr) {
                arr.push(items)
            }

        }

    });

    // Only change code above this line
    return arr;
}

whatIsInAName([{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], { last: "Capulet" });

// THINGS LEARNED

// To get the length of an object(amount of properties it has), just use Object.keys(source).length 