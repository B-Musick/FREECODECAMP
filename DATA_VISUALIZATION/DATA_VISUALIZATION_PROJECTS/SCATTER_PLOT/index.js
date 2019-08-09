

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
        .style('background-color', '#f5857d');

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
        let time = new Date();

        // *** Set minutes and seconds so form is in 33:33 when use  const yAxis = d3.axisLeft(yScale)
        // .tickFormat(d3.timeFormat("%M:%S"))
        time.setMinutes(timeArray[0]);
        time.setSeconds(timeArray[1]);

        

        // Then need to create Date object for the yVal
        let yVal = time; // Wed Dec 31 1969 17:02:23 GMT-0700 (Mountain Standard Time)
        
        return [xVal,yVal]
    })
    

    console.log(dataMap[dataMap.length-1][1])

    /********************** SCALE THE AXIS ********************************** */
    let xScale = d3.scaleLinear()
        // Take the domain 'dates' and map them to the x-axis
        .domain([d3.min(dataMap,d=>d[0]), d3.max(dataMap,d=>d[0])]) // (first(earliest) date, last(latest) date)
        .range([padding*2, width - padding]);

    let yScale = d3.scaleTime()
        // Take the domain 'dates' and map them to the x-axis
        .domain([d3.min(dataMap, d => d[1]), d3.max(dataMap, d => d[1])]) // (first(earliest) date, last(latest) date)
        .range([padding, height - padding]);

    const xAxis = d3.axisBottom(xScale)
        // Format tick year number so 1,000 becomes 1000
        .tickFormat(d3.format("d"))
    const yAxis = d3.axisLeft(yScale)
        // Format so number displays as mm:ss
        .tickFormat(d3.timeFormat("%M:%S"))

   
    // Tooltip body
    let tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")

    svg.selectAll('circle')
        .data(dataMap)
        .enter()
        .append('circle')
            .attr('data-xvalue',d=>d[0]+"")
            .attr('cx', d => xScale(d[0]))
            .attr('cy', d => yScale(d[1]))
            .attr('data-yvalue', d => d[1] + "")
            .attr('class','dot')
            .attr('r','5')
            .style('fill','#054d63')
            // Tooltip
            .on("mouseover", function (d, i) {
                d3.select(this).style("fill", "a8eddf");
                tooltip.attr("id", "tooltip")
                tooltip.style("fill", "#a8eddf")
                tooltip.attr("data-year", d[0])
                tooltip.style('opacity', 1)
                tooltip.html("In " + d[0] + " the riders time was " + d[1].getMinutes()+":"+d[1].getSeconds())
                    // This will give the coordinates where mouseevent is and put tooltip there
                    .style("left", ((d3.event.pageX + 15) + "px"))
                    .style("top", (d3.event.pageY - 28) + "px")

            })
            .on("mouseout", function () {
                // When mouse stops hovering a specific bar
                d3.select(this)
                    .transition()
                    .duration(400)
                    .style("fill", "#054d63");
                tooltip.style("opacity", 0);
            }) 
    
    /***************************** X-AXIS *********************************** */
    svg.append('g')
        // Define x,y coordinates translation from the left of screen and from top of screen 
        .attr('transform', "translate(0," + (height - padding) + ")") // translate from svg edge to bottom of screen
        .call(xAxis) // Call function x-axis on elements of selection 'g'
        .attr('id', 'x-axis');

    /***************************** Y-AXIS *********************************** */

    svg.append('g')
        // Translate will define location of y-axis by defining (x,y) translation
        // If didnt add padding to x-coordinate, the y-axis is against the screen
        .attr('transform', "translate(" + (padding) + ", 0)") // translate from svg left edge and y coordinate from top of screen
        .call(yAxis) // Call function y-axis on elements of selection 'g'
        .attr('id', 'y-axis');
    
    let legend = svg.append('g')
        .attr('id', 'legend')
        .append('rect')
            .attr('x', width-(padding*4))
            .attr('y', padding)
            .attr('width','200px')
            .attr('height', '110px')
        .style('fill','#ba4138')



        
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


/*************************** THINGS LEARNED ********************************* 
 * let time = new Date();

        // *** Set minutes and seconds so form is in 33:33 when use  const yAxis = d3.axisLeft(yScale)
        // .tickFormat(d3.timeFormat("%M:%S"))
        time.setMinutes(timeArray[0]);
        time.setSeconds(timeArray[1]);
*/
