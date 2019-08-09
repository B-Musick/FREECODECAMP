

/****************************API REQUEST  ************************************
 * https://guide.freecodecamp.org/javascript/closures/
 * https://flaviocopes.com/fetch-api/
 * https://medium.com/@armando_amador/how-to-make-http-requests-using-fetch-api-and-promises-b0ca7370a444
*/


getData = async (URL) =>{
    const response = await fetch(URL);
    return response.json()
}

main = async () => {
    // Save Window variable
    let svg = d3.select('svg')
        .style('background-color', 'lightblue');

    // Variables
    let padding = 60;
    let width = +(svg.attr('width'));
    let height = +(svg.attr('height'));

    // Get the JSON data as an object
    const dataset = await getData("https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json");

    // Turn 'Time' from 36:50 --> milliseconds (36*3600 + 50*60)
    // Regex --> (dataset[0].Time).match(/\d+\d+/g)
    console.log((dataset[0].Time).match(/\d+\d+/g));

    /************************** SAVE [X,Y] TO ARRAY ************************** */
    let dataMap = dataset.map(data=>{
        // Returns array of x and y value [x,y]
        let timeArray = data.Time.match(/\d+\d+/g);
        let xVal = data.Year;

        // Handle the time array of values from left and right of colon (strings) ["33","33"]
        let time = new Date(parseInt(timeArray[0])*3600+parseInt(timeArray[1]*60));

        // Then need to create Date object for the yVal
        let yVal = time; // Wed Dec 31 1969 17:02:23 GMT-0700 (Mountain Standard Time)
        
        return [xVal,yVal]
    })

    console.log(dataMap[dataMap.length-1][1].getSeconds())
    /********************** SCALE THE AXIS ********************************** */
    let xScale = d3.scaleLinear()
        // Take the domain 'dates' and map them to the x-axis
        .domain([dataMap[0][0], dataMap[dataMap.length - 1][0]]) // (first(earliest) date, last(latest) date)
        .range([padding, width - padding]);

    let yScale = d3.scaleTime()
        // Take the domain 'dates' and map them to the x-axis
        .domain([dataMap[0][1], dataMap[dataMap.length - 1][1]]) // (first(earliest) date, last(latest) date)
        .range([height - padding, padding]);

    svg.selectAll('circle')
        .data(dataMap)
        .enter()
        .append('circle')
            .attr('data-xvalue',d=>d[0]+"")
            .attr('cx', d => xScale(d[0]))
            .attr('cy', d => yScale(d[1].getMinutes()+":"+d[1].getSeconds()))
            .attr('data-yvalue', d => d[1] + "")
            .attr('class','dot')
            .style('fill','blue'); 
    
}

main();
// let dataset = main();

/*
 * Doping: "Alleged drug use during 1995 due to high hematocrit levels"
 * Name: "Marco Pantani"
 * Nationality: "ITA"
 * Place: 1
 * Seconds: 2210
 * Time: "36:50"
 * URL: "https://en.wikipedia.org/wiki/Marco_Pantani#Alleged_drug_use"
 * Year: 1995
 * */
// const dataFunc = thisData(); 
// let dataset = dataFunc.getData(); // Holds array of objects with data values


