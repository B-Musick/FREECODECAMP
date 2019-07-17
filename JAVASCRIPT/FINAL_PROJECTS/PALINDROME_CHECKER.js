function palindrome(str) {
    // Good luck!

    let newStr = str.replace(/\s|\_|\\|\/|:|\(|\)|\.|\,|\||\-/gi, "");
    let lowStr = newStr.toLowerCase();

    // Set to array then reverse the word
    let strArrRev = lowStr.split('').reverse();
    let revWord = strArrRev.join('');
    console.log(revWord)
    return revWord === lowStr;
}


palindrome("eye") // should return a boolean.

palindrome("eye") //should return true.

palindrome("_eye") // return true.

palindrome("race car") // return true.

palindrome("not a palindrome") // return false.

palindrome("A man, a plan, a canal. Panama") // return true.

palindrome("never odd or even") // return true.

palindrome("nope") // return false.

palindrome("almostomla") // return false.

palindrome("My age is 0, 0 si ega ym.") // return true.

palindrome("1 eye for of 1 eye.") // return false.

palindrome("0_0 (: /-\ :) 0-0") // return true.

palindrome("five|\_/|four") // return false.