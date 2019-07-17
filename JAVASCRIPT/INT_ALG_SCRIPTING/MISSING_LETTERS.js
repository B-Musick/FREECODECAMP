function fearNotLetter(str) {
  let alphabet="abcdefghijklmnopqrstuvwxyz";

  // Get the first and last letter of str and get their indices in alphabet
  let firstLetter = alphabet.indexOf(str[0]);
  let lastLetter = alphabet.indexOf(str[str.length-1]);

  // Get the substring from the alphabet
  let alphabetSub = alphabet.substring(firstLetter,lastLetter+1);
  
  // In for loop compare substring to str and when one not equal then return it
  for(let i=0;i<alphabetSub.length;i++){
    if(str[i]!=alphabetSub[i]){
      return alphabetSub[i];
    }
  }
  // If gets to the end of the loop with no qualms then return undefined

  return undefined;
}

fearNotLetter("abce") // Should return d;
fearNotLetter("abcdefghjklmno") // should return "i".
fearNotLetter("stvwx") // should return "u".
fearNotLetter("bcdf") // should return "e".
fearNotLetter("abcdefghijklmnopqrstuvwxyz") //should return undefined.