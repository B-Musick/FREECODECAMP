function getPrime(num) {
    // Greater than 1
    // Divides by 1 and itself
    let primes = [];
    for (let i = 2; i <= num; i++) {
        let divisibleCount = 0;
        for (let j = 2; j <= i; j++) {
            if (i % j == 0) {
                divisibleCount++;
            }
        }
        if (divisibleCount <= 1) {
            primes.push(i);
        }
    }
    return primes;
}

function sumPrimes(num) {

    return getPrime(num).reduce((acc, cur) => { return acc + cur });
}

sumPrimes(977);
sumPrimes(10);

// THINGS LEARNED
// How to use reduce((acc,cur)=>{return acc+cur})