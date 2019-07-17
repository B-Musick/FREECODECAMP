function convertToRoman(num) {
    let numeral = "";
    let tens = Math.floor(num / 10);
    let remainder = num % 10;


    if (tens < 1) {
        // If the number is less than 10
        numeral = lessThanTen(remainder);


    } else if (tens < 40) {
        numeral = convertTens(tens) + lessThanTen(remainder);
    }
    return numeral;
}



function convertToThree(value) {
    // Convert ny value up to 3

    return "I".repeat(value);
}

function convertToFive(value) {
    // Convert value 4 and 5
    if (value === 4) {
        return "IV";
    } else if (value === 5) {
        return "V";
    }
    return "";
}

function convertToEight(value) {
    // Convert values 6 to 8
    return "V" + convertToThree(value % 5);
}

function convertToNine(value) {
    return "IX";
}

function convertTens(value) {
    // Place the tens value to return it in numeral
    if (value <= 3) {
        return "X".repeat(value);
    }
    return "";
}

function lessThanTen(remainder) {
    // Convert the values less than 10

    if (remainder <= 3) {
        console.log(convertToThree(remainder))
        return convertToThree(remainder);
    } else if (remainder <= 5) {
        return convertToFive(remainder);
    } else if (remainder <= 8) {
        return convertToEight(remainder);
    } else if (remainder == 9) {
        return convertToNine(remainder);
    }
    return "";
}

console.log(convertToRoman());