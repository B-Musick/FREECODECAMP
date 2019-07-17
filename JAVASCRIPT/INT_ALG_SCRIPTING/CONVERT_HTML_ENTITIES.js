function convertHTML(str) {
    let entities = {
        "'": "&apos;",
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
    }
    // &colon;&rpar;
    let strArr = str.split('');
    let entityKeys = Object.keys(entities);

    for (let i = 0; i < strArr.length; i++) {
        if (entityKeys.includes(strArr[i])) {
            strArr.splice(i, 1, entities[strArr[i]]); // Replace with correspoding entity
        }
    }

    let returnStr = strArr.join('');
    console.log(returnStr)
    return returnStr;
}
convertHTML("<>");
convertHTML("Dolce & Gabbana");
convertHTML("Schindler's List");
convertHTML('Stuff in "quotation marks"');

convertHTML("Hamburgers < Pizza < Tacos");

// THINGS LEARNED
// *** Use an object to easily access associated things you want to replace something with
// Use splice(index, amount, replacements) to replace values
// Use Object.keys(array) to make an array from the keys of an object