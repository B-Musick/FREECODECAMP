function orbitalPeriod(arr) {
    var GM = 398600.4418;
    var earthRadius = 6367.4447;
    var newArr = [];

    var a = earthRadius;
    var rad;
    arr.forEach(function (obj) {
        rad = a + obj['avgAlt']; // Get the total radius

        delete obj.avgAlt; // Delete from the object
        // Calculate the orbital period
        obj['orbitalPeriod'] = Math.round(2 * (Math.PI) * (Math.sqrt(Math.pow(rad, 3) / GM)));
        // Push to the new array
        newArr.push(obj);
    });
    return newArr;

}


console.log(orbitalPeriod([{ name: "iss", avgAlt: 413.6 }, { name: "hubble", avgAlt: 556.7 }, { name: "moon", avgAlt: 378632.553 }]));