function spinalCase(str) {
    // "It's such a fine line between stupid, and clever."
    // --David St. Hubbins
    // First, need to add any whitespace where needed

    // Replace any places where there is a lowercase then capital together and
    // puts a space in between them
    let whiteStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Split the string into an array at any whitespace or underscore regex
    let strArr = whiteStr.toLowerCase().split(/\s|[_]/);

    // Join the array of string with dashes
    let newStr = strArr.join("-");

    return newStr;
}

// TEST FUNCTIONS
console.log(spinalCase("This Is Spinal Tap"));
spinalCase("AllThe-small Things");
spinalCase("The_Andy_Griffith_Show");
spinalCase("AllThe-small Things");
spinalCase("thisIsSpinalTap");

// THINGS COVERED
// *** How to replace a whitespace to the certain place in the strin using regex
// *** Use $ signs in replace() to replace the matched values back to place