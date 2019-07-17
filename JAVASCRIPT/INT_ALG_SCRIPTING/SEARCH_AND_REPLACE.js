function myReplace(str, before, after) {
    let newBefore = new RegExp(before); // Turn before into a regex to find
    let newAfter = "";
    if (before[0] == before[0].toLowerCase()) {
        // If the first letter is lower case in before
        after = after.toLowerCase();
    } else {
        // If the first letter is uppercase in before
        let firstChar = after[0].toUpperCase(); // Turn the after first letter to capital
        let rest = after.substring(1); // Take the rest of the word

        newAfter = firstChar.concat(rest); // Recombine the word

        return str.replace(newBefore, newAfter); // Return the new sentence

    }

    let newStr = str.replace(newBefore, after);

    return newStr;
}
myReplace("Let us go to the store", "store", "mall");
myReplace("A quick brown fox jumped over the lazy dog", "Jumped", "leaped");
myReplace("He is Sleeping on the couch", "Sleeping", "sitting");
myReplace("His name is Tom", "Tom", "john") // should return "His name is John".
myReplace("Let us get back to more Coding", "Coding", "algorithms") //should return "Let us get back to more Algorithms".

// THINGS LEARNED
// *** How to turn a variable passed through function to a regular expression