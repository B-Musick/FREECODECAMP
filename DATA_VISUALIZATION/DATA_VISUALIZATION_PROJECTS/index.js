
// API Request
let req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);

req.onload = () => {
    const svg = d3.select('svg')

    // dataset will be an array of arrays, the first value being the date, second the gdp
    let dataset = []

    const width = +(svg.attr('width'));
    const height = +(svg.attr('height'));
    const padding = 80;
    // Push all the GDP data from Federal reserve
    json = JSON.parse(req.responseText);
    
    json.data.forEach((val)=>{
        dataset.push(val);    
        
    })
    
    
    let dataMap = dataset.map(data=>{
        console.log(...data[0].match(/\d+/g));
        return [new Date(...data[0].match(/\d+/g)),data[1]];
    })
    //console.log(dataset[0][0].match(/\d+/g))
    console.log(dataMap)
    // Set the xScale using date values, map the domain to the range to fit the page
    let xScale = d3.scaleTime()
        // Take the domain 'dates' and map them to the x-axis
        .domain([dataMap[0][0], dataMap[dataMap.length-1][0]]) // (first(earliest) date, last(latest) date)
        .range([padding, width - padding]);
        
    // console.log(xScale(new Date('1947 01 01'))); // How access dates in xScale

    // Set the y-scale using the GDP values
    let yScale = d3.scaleLinear()
        .domain([0, d3.max(dataMap, (d) =>d[1] )])
        /* y-axis starts at bottom of screen so need 
         0 ------> height-padding(bottom), then d3.max(dataMap, d =>{d[1]})]) -----> padding (top) */

        .range([height - padding, padding]);

    console.log(yScale('1000'))
    // Axis takes scale function, determine whaat values in scale correspond to what pixels
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
        // Define x,y coordinates translation from the left of screen and from top of screen 
        .attr('transform', "translate(0, " + (height - padding) + ")") // translate from svg edge to bottom of screen
        .call(xAxis) // Call function x-axis on elements of selection 'g'
        .attr('class', 'x-axis');

    svg.append('g')
        // Translate will define location of y-axis by defining (x,y) translation
        // If didnt add padding to x-coordinate, the y-axis is against the screen
        .attr('transform', "translate(" + (padding) + ", 0)") // translate from svg left edge and y coordinate from top of screen
        .call(yAxis) // Call function x-axis on elements of selection 'g'
        .attr('class', 'y-axis');

    svg.selectAll('rect')
        .data(dataMap)
        .enter()
        .append('rect')
            .attr('x', d => xScale(d[0])+"")
            .attr('y', d => yScale((d[1]))+"")
            .style('fill','black')

    svg.style('background-color', 'lightblue');






};
console.log(req.response);
req.send();

// ${document}.ready(()=>{
//     var api ='https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json';

//     $.getJSON(api,(data)={
//         alert(data.)
//     })
// })
// let response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json');
// let data = await response.json();
// console.log(data);


