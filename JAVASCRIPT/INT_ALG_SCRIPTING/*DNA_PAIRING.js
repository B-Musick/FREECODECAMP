function pairElement(str) {
    // Save base pairs to object to easily access the corresponding pair
    let basePairs = { "G": "C", "A": "T", "C": "G", "T": "A" };

    // Split string into array of characters
    let splitStr = str.split('');

    // Create array for bp arrays to be saved to
    let returnArr = [];

    // Cycle through character array and match each character with corresponding base-pair
    for (let i = 0; i < splitStr.length; i++) {
        // basePairs[splitStr[i]] will access the object saved to basePairs and return the property value corresponding to the letter
        let pairArr = [splitStr[i], basePairs[splitStr[i]]];
        returnArr.push(pairArr); // Add bp array to return array
    }
    return returnArr;
}

pairElement("ATCGA") // should return [["A","T"],["T","A"],["C","G"],["G","C"],["A","T"]]
pairElement("TTGAG") // should return [["T","A"],["T","A"],["G","C"],["A","T"],["G","C"]].
pairElement("CTCTA") // should return [["C","G"],["T","A"],["C","G"],["T","A"],["A","T"]].
pairElement("GCG");

// THINGS LEARNED
// *** Make an object with corresponding pairs to easily access a match

// MAKE BETTER
// *** Try and do this but using array.map() ***