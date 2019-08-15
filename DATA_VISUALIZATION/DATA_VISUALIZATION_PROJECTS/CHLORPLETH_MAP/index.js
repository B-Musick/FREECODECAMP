d3.json(
    'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'
).then(data=>{
    const createChloropleth = new ChloroplethMap(data);
    console.log(createChloropleth)
})

class ChloroplethMap{
    constructor(data){
        // SET DATA
        this.JSONdata = data;

        // BODY
        this.body = d3.select('body');

        // HEADER
        this.header = this.body.append('div')
            .attr('id', 'header-container');

        // title
        this.title = this.header.append('h1')
            .attr('id', 'title')
            .style('text-align', 'center')
            .text('U.S Education Data');

        // description
        this.description = this.header.append('p')
            .attr('id', 'description')
            .style('text-align', 'center')
            .text('Educational stats');

        // CANVAS
        this.svg = this.body.append('svg')
            .attr('width', '1000')
            .attr('height', '800')
            .style('background-color', 'lightblue');
    }

}



