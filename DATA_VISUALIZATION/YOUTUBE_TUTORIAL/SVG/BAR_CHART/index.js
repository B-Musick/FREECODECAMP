const svg = d3.select('svg');
// svg.style('background-color', 'grey');

// Width and height of svg screen 
const width = parseFloat(svg.attr('width'));
const height = +(svg.attr('height'));

const render = data => {
    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data,d=>d.population)])

    console.log(xScale.domain())
    // select all existing rectangles
    svg.selectAll('rect').data(data)
        .enter().append('rect')
            .attr('width', 300)
            .attr('height', 300)
}
d3.csv('data.csv').then(data =>{
    data.forEach(d => {
        d.population = +d.population * 1000;
    });
    // Method defined above to create a rectangle form the data
    render(data);
})
