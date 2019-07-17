function translatePigLatin(str) {
    let consStr;
    let vowels = ['a', 'e', 'i', 'o', 'u']

    for (let i = 0; i < vowels.length; i++) {
        // Check if no vowels at all
        if (str.includes(vowels[i])) {
            // If there is a vowel found in string then break and exit for loop
            break;
        }
        if (i == vowels.length - 1) {
            // If the word doesnt have any vowels
            return str.concat("ay");
        }

    };
    if (!vowels.includes(str[0])) {
        // If first letter isnt a vowel, then add "ay"
        consStr = str.replace(/(^[^aeiou]+)(\w+)|(\w+)/, "$2$1ay")

    } else {
        // If first letter is a vowel then take the word and add "way"
        consStr = str.concat("way");
    }

    console.log(consStr);
    return consStr;
}

translatePigLatin("algorithm");
translatePigLatin("california") // should return "aliforniacay".
translatePigLatin("paragraphs") // should return "aragraphspay".
translatePigLatin("glove") // should return "oveglay".
translatePigLatin("eight") // should return "eightway".
// Should handle words where the first vowel comes in the end of the word.
// Handle word with no vowels

// THINGS LEARNED
// *** How to find a match until a certain vowel (^[^aeiou]+)