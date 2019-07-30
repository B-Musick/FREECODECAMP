const svg = d3.select('svg');
// svg.style('background-color', 'grey');

// Width and height of svg screen 
const width = parseFloat(svg.attr('width'));
const height = +(svg.attr('height'));

const render = data => {
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.population)])
        .range([0,width]) // 'Width is extracted from SVG element which is max width of our container'
    
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.country)) // Maps the country valyes to the domain
        .range([0, height]) // Data elements arranged from top to bottom

    console.log(xScale.range())
    // select all existing rectangles
    svg.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('color', 'red')
            .attr('y', d=>yScale(d.country))
            .attr('width', d=>xScale(d.population))
            .attr('height', yScale.bandwith())
}
d3.csv('data.csv').then(data =>{
    data.forEach(d => {
        d.population = +d.population * 1000;
    });
    // Method defined above to create a rectangle form the data
    render(data);
})
