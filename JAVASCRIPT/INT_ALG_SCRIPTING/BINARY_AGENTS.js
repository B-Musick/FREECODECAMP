function binaryAgent(str) {
    let splitString = str.split(" ");
    let returnStr = "";
    let value;
    for(let i = 0; i<splitString.length;i++){
        value = convertStringToBinary(splitString[i]);
        console.log(String.fromCharCode(value));
        returnStr+=String.fromCharCode(value);
    }
    
    return returnStr;
}

function convertStringToBinary(str){
    let splitStr = str.split(""); // Split every 'letter' to array
    splitStr = splitStr.map(x => parseInt(x)); // Convert them to numbers
    let returnVal = 0; // This will hold the final value
    let counter = 1;
    for(let i = splitStr.length-1; i>=0;i--){
        // Go from right to left to convert to number
        if (i == splitStr.length - 1){
            // First value represents 1
            returnVal+=(1*splitStr[i]);
        }else{
            // All other values to left represent multiple of 2
            // Counter will increase and will be the exponent
            returnVal+=Math.pow((2*splitStr[i]),counter);
            counter++;
        }
        

    }
    return returnVal;
}
console.log(binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111")) ; //should return "Aren't bonfires fun!?"
console.log(binaryAgent("01001001 00100000 01101100 01101111 01110110 01100101 00100000 01000110 01110010 01100101 01100101 01000011 01101111 01100100 01100101 01000011 01100001 01101101 01110000 00100001")); // should return "I love FreeCodeCamp!"

/************************ THINGS COVERED ************************************ 
 * String.fromCharCode(val) will take the val and convert it to ASCII
 * 
 * .split("") to split a word into array of letters, .split(" ") to split sentence
 * into array of words
 * 
 * Math.pow(base, exp) will give outcome of base to the power of exp
 * 
 * Binary involves on or off. The right most value is a 1, and all those occuring
 * to the left are multiples of 2 starting to the power of 1, and increasing by
 * one power as go left
*/
