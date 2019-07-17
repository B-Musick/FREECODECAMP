
    
    
    function Person(firstAndLast) {
        let fullName = firstAndLast; // Have to put before split otherwise turns it into array and causes error
        var nameArr = firstAndLast.split(' '); // Split the full name into array
        
        let firstName = nameArr[0];
        let lastName = nameArr[1];

    
        this.getFullName = function () {
            return firstName + " " + lastName;
        };
        this.getFirstName = function () {
            return firstName;
        };

        this.getLastName = function () {
            return lastName;
        };
        this.setFirstName = function (name) {
            firstName = name;
            fullName = firstName + " " + lastName
        };
        this.setLastName = function (name) {
            lastName = name;
            fullName = firstName + " " + lastName
        };
       this.setFullName = function (name) {
            fullName = name;
            var nameArr = fullName.split(' '); // Split the full name into array
            firstName = nameArr[0];
            lastName = nameArr[1];
        };
}
    
    



var bob = new Person('Bob Ross');
bob.getFullName();

console.log(Object.keys(bob).length ); //should return 6.
console.log(bob instanceof Person ); //should return true.
console.log(bob.firstName ); //should return undefined.
console.log(bob.lastName ); //should return undefined.
console.log(bob.getFirstName()); // should return "Bob".
console.log(bob.getLastName()); // should return "Ross".
console.log(bob.getFullName()); // should return "Bob Ross".
console.log(bob.getFullName()); // should return "Haskell Ross" after bob.setFirstName("Haskell").
bob.setFirstName("Haskell");
console.log(bob.getFullName()); // should return "Haskell Curry" after bob.setLastName("Curry").
console.log(bob.getFullName()); // should return "Haskell Curry" after bob.setFullName("Haskell Curry").
console.log(bob.getFirstName()); // should return "Haskell" after bob.setFullName("Haskell Curry").
console.log(bob.getLastName()); // should return "Curry" after bob.setFullName("Haskell Curry").

console.log(bob.firstName)

/*****************************THINGS LEARNED *********************************
 * How to make it so properties can only be accessed from within (using let and not 'this')
 * Define the getters and setters within the constructor
 * https://stackoverflow.com/questions/22156326/private-properties-in-javascript-es6-classes
 */
