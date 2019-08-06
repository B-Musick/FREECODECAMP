
// API Request
let req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);

req.onload = () => {
    const svg = d3.select('svg')

    // dataset will be an array of arrays, the first value being the date, second the gdp
    let dataset = []

    const width = +(svg.attr('width'));
    const height = +(svg.attr('height'));
    const padding = 60;
    // Push all the GDP data from Federal reserve
    json = JSON.parse(req.responseText);
    
    json.data.forEach((val)=>{
        dataset.push(val);    
        
    })
    
    
    let dataMap = dataset.map(data=>{
        return [new Date(...data[0].match(/\d+/g)),data[1]];
    })
    console.log(dataMap)
    //console.log(dataset[0][0].match(/\d+/g))
    console.log(dataMap)
    // Set the xScale using date values, map the domain to the range to fit the page
    console.log(dataMap[0][1])
    console.log(dataMap[dataMap.length - 1][1])

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
        
        .range([height-padding, padding]);

    console.log(yScale('1000'))
    // Axis takes scale function, determine whaat values in scale correspond to what pixels
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    const barWidth = 3;


    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
            .attr('data-date', d => d[0]+"") // Needs to match date on x-axis
            .attr('data-gdp', d => d[1]+"") // Needs to match gdp of y-axis
            .attr('width',barWidth+"") // Width of bars
            .attr('height',d=>height-yScale(d[1])-padding) // Height is the height - yScale value
            .attr('class','bar')
            // Need attribute 'x' to show date in form '2017-01-02'
            .attr('x', (d, i) => xScale(new Date(...d[0].match(/\d+/g)))+"") // Location of bars on x-axis
            .attr('y', d => yScale((d[1]))+padding + "") // Makes sure bars arent above x-axis
            .attr("transform",`translate(0,${-padding})`)
            .style('fill','#4aa89c')
            // Tooltip
                .on("mouseover", function (d, i) {
                    var barColor = d3.select(this);
                    barColor.style("fill", "a8eddf")
                    d3.select(this).append('title')
                        .style("opacity", 0.9)
                        .attr("id", "tooltip")
                        .style("fill", "#a8eddf")
                        .attr("data-date", d[0])
                        .html(d[0])
                            // This will give the coordinates where mouseevent is and put tooltip there
                            .style("left", d3.event.pageX + "px")
                            .style("top", d3.event.pageY+ "px")
                            .style('font-size','4')
                })
                .on("mouseout", function () {
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .style("fill", "#4aa89c")
                        .style("opacity", 0);
                })

    svg.append('g')
        // Define x,y coordinates translation from the left of screen and from top of screen 
        .attr('transform', "translate(0," + (height - padding) + ")") // translate from svg edge to bottom of screen
        .call(xAxis) // Call function x-axis on elements of selection 'g'
        .attr('id', 'x-axis');

    svg.append('g')
        // Translate will define location of y-axis by defining (x,y) translation
        // If didnt add padding to x-coordinate, the y-axis is against the screen
        .attr('transform', "translate(" + (padding) + ", 0)") // translate from svg left edge and y coordinate from top of screen
        .call(yAxis) // Call function x-axis on elements of selection 'g'
        .attr('id', 'y-axis');

    svg.style('background-color', '#eaebe4');






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

