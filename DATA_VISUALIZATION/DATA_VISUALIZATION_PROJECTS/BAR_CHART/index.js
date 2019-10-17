
// API Request
let req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);

req.onload = () => {
    const svg = d3.select('svg');

    // dataset will be an array of arrays, the first value being the date, second the gdp
    let dataset = []

    // Get width and heights values, + parses the values to float
    const width = 0.70*screen.width;
    const height = 0.70*screen.height;
    const padding = 60;
    
    // Push all the GDP data from Federal reserve, parse into usable data 
    json = JSON.parse(req.responseText);
    
    json.data.forEach((val)=>{
        // Push the data into the array(date string, GDP value)
        dataset.push(val);    
    })
    
    // Maps a new array with the dates in proper format, and the original gdp
    let dataMap = dataset.map(data=>{
        // Dates are the first value in each array ("1947-01-01")
        return [new Date(...data[0].match(/\d+/g)),data[1]];
    })

    // Set the xScale using date values, map the domain to the range to fit the page
    let xScale = d3.scaleTime()
        // Take the domain 'dates' and map them to the x-axis
        .domain([dataMap[0][0], dataMap[dataMap.length-1][0]]) // (first(earliest) date, last(latest) date)
        .range([padding, (width - padding)]); // Left screen, right screen
        
    // console.log(xScale(new Date('1947 01 01'))); // How access dates in xScale

    // Set the y-scale using the GDP values
    let yScale = d3.scaleLinear()
        .domain([0, d3.max(dataMap, (d) =>d[1] )])
        /* y-axis starts at bottom of screen so need 
         0 ------> height-padding(bottom), then d3.max(dataMap, d =>{d[1]})]) -----> padding (top) */
        .range([height-padding, padding]);

    // console.log(yScale('1000')) // Test scale

    // Axis takes scale function, determine whaat values in scale correspond to what pixels
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);

    svg.append("text")
        .attr("class", "y-label")
        .attr("text-anchor", "middle")
        .attr("y", 2)
        .attr('x',-(height/2))
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .style('font-size',screen.width*0.01+"")
        .text("GDP ( billions $ )");
    
    svg.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width/2)
        .attr("y", height - 12)
        .style('font-size', screen.width * 0.01 + "")
        .text("Date (year)");

    // Holds value for the bar chart bars width
    const barWidth = 3;

    // Tooltip body
    let tooltip = d3
        .select("body")
        .append("div")
        .attr("id", "tooltip")

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
            // Use yScale to convert value from JSON data to that of the screen conversion 
            .attr('y', d => yScale((d[1]))+padding + "") // Makes sure bars arent above x-axis
            .attr("transform",`translate(0,${-padding})`)
            .style('fill','#4aa89c')
            // Tooltip
            .on("mouseout", function () {
                // When mouse stops hovering a specific bar
                d3.select(this)
                    .transition()
                    .duration(400)
                    .style("fill", "#4aa89c");
                tooltip.style("opacity", 0);
                tooltip.style("display", "block")
            })
            .on("mouseover", function (d, i) {
                d3.select(this).style("fill", "a8eddf");
                tooltip.attr("id", "tooltip")
                tooltip.style("fill", "#a8eddf")
                tooltip.style("display", "block")
                tooltip.attr("data-date", d[0])
                tooltip.style('opacity', 1)
                tooltip.html("In "+d[0] + " GDP was " + d[1])
                    // This will give the coordinates where mouseevent is and put tooltip there
                    .style("left", (i * barWidth)+padding + "px")
                    .style("top", height - (2*padding)  + "px")
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

req.send();


