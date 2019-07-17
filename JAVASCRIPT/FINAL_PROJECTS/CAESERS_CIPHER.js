function rot13(str) { // LBH QVQ VG!
  let alphabet = "abcdefghijklmnopqrstuvwxyz";

  let cypher = {
    "a":"n","b":"o","c":"p","d":"q",
    "e":"r","f":"s","g":"t","h":"u",
    "i":"v","j":"w","k":"x","l":"y",
    "m":"z","n":"a","o":"b","p":"c",
    "q":"d","r":"e","s":"f","t":"g",
    "u":"h","v":"i","w":"j","x":"k",
    "y":"l","z":"m",

  }

  // Split string into array
  let strArr = str.split('');

  for(var i = 0;i<strArr.length;i++){
    if(alphabet.toUpperCase().includes(strArr[i])){
      // If the value in the array is a letter of the alphabet
      // Splice out that current letter for the associated cypher
      // No other characters will be changed
      strArr.splice(i,1,cypher[str[i].toLowerCase()]); 
    }
  }

  let retStr = "";

  for(let i = 0; i<strArr.length;i++){
    // Use for loop to join spaces when needed (whitespace = undefined)
    if(strArr[i]!=undefined){
      retStr+=strArr[i];
    }else{
      retStr+=" "
    }
    
  }

  return retStr.toUpperCase();
}
// Change the inputs below to test
rot13("SERR CVMMN!"); // FREE PIZZA!
rot13("SERR PBQR PNZC") // FREE CODE CAMP