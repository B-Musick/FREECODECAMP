function telephoneCheck(str) {
    // Good luck!
    let reg1 = RegExp(/^\d{3}\-\d{3}\-\d{4}/);
    let reg2 = RegExp(/^[1]\s\d{3}\-\d{3}\-\d{4}/);
    let reg3 = RegExp(/^[1]\s\(\d{3}\)\s\d{3}\-\d{4}/);
    let reg4 = RegExp(/^\d{10}$/);
    let reg8 = RegExp(/^[1]\d{9}$/);
    let reg5 = RegExp(/^[1]\(\d{3}\)\d{3}\-\d{4}/);
    let reg6 = RegExp(/^[1]\s\d{3}\s\d{3}\s\d{4}/);
    let reg7 = RegExp(/^\(\d{3}\)\d{3}\-\d{4}/);

    return reg1.test(str) || reg2.test(str) || reg3.test(str) || reg4.test(str) || reg5.test(str) || reg6.test(str) || reg7.test(str) || reg8.test(str);

}

telephoneCheck("555-555-5555") //should return a boolean.
    
telephoneCheck("1 555-555-5555") //should return true.

telephoneCheck("1 (555) 555-5555") //should return true.
    
telephoneCheck("5555555555") //should return true.
telephoneCheck("555-555-5555") //should return true.
telephoneCheck("(555)555-5555") //should return true.
telephoneCheck("1(555)555-5555") //should return true.
telephoneCheck("555-5555") //should return false.
telephoneCheck("5555555") //should return false.
telephoneCheck("1 555)555-5555") //should return false.
telephoneCheck("1 555 555 5555") //should return true.
telephoneCheck("1 456 789 4444") //should return true.
telephoneCheck("123**&!!asdf#") //should return false.
telephoneCheck("55555555") //should return false.
telephoneCheck("(6054756961)") //should return fals
telephoneCheck("2 (757) 622-7382") //should return false.
telephoneCheck("0 (757) 622-7382") //should return false.
telephoneCheck("-1 (757) 622-7382") //should return fals
telephoneCheck("2 757 622-7382") //should return false.
telephoneCheck("10 (757) 622-7382") //should return false.
telephoneCheck("27576227382") //should return false.
telephoneCheck("(275)76227382") //should return false.
telephoneCheck("2(757)6227382") //should return false.
telephoneCheck("2(757)622-7382") //should return false.
telephoneCheck("555)-555-5555") //should return false.
telephoneCheck("(555-555-5555") //should return false.
telephoneCheck("(555)5(55?)-5555") //should return false.