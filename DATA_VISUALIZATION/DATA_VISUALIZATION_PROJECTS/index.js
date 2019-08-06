
// API Request
let req = new XMLHttpRequest();
req.open("GET", 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json', true);

req.onload = () => {
    const svg = d3.select('svg')

    // dataset will be an array of arrays, the first value being the date, second the gdp
    let dataset = []

    const width = +(svg.attr('width'));
    const height = +(svg.attr('height'));
    const padding = 30;
    // Push all the GDP data from Federal reserve
    json = JSON.parse(req.responseText);
    
    json.data.forEach((val)=>{
        dataset.push(val);    
        
    })
    
    
    let dates = dataset.map(data=>{
        console.log(...data[0].match(/\d+/g));
        return new Date(...data[0].match(/\d+/g));
    })
    //console.log(dataset[0][0].match(/\d+/g))
    console.log(dates)
    // Set the xScale using date values, map the domain to the range to fit the page
    let xScale = d3.scaleTime()
        .domain([dates[0], dates[dates.length-1]])
        // .domain(
        //     [
        //         new Date(d3.min(dataset, (d) => d[0])),
        //         new Date(d3.max(dataset, (d) => d[0]))
        //     ]
        // )
        .range([padding, width - padding]);
        
    // let xScale = d3.scaleLinear()
    //     .range([padding, width - padding]);
    console.log(xScale(new Date('1947 01 01')))
    // Set the y-scale using the GDP values
    let yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d =>{
            d[1]
            // console.log(d[1])
        } )])
        .range([height - padding, padding]);

    // Axis takes scale function, determine whaat values in scale correspond to what pixels
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
        .attr('transform', "translate(80, " + (height - padding) + ")") // translate from svg edge to bottom of screen
        .call(xAxis) // Call function x-axis on elements of selection 'g'
        .attr('class', 'x-axis');

    svg.append('g')
        .attr('transform', "translate(" + (height - padding) + ", 80)") // translate from svg edge to bottom of screen
        .call(yAxis) // Call function x-axis on elements of selection 'g'
        .attr('class', 'y-axis');
    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
            .attr('x', d => xScale(d[0]))
            .attr('y', d => yScale((d[1])))
            .style('border', '1px solid black')

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


