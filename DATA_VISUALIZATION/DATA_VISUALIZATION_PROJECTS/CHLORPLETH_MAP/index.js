d3.json(
    'https://raw.githubusercontent.com/no-stack-dub-sack/testable-projects-fcc/master/src/data/choropleth_map/counties.json'
).then(data=>{
    const createChloropleth = new ChloroplethMap(data);
    console.log(data)
    createChloropleth.setCounties();
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

    setCounties(){
        // TAKE OUT FIRST ARC IN ARRAY TO USE AS MOVETO
        let lineArrays = this.JSONdata.arcs;
        let startPoints = []
        
        // Take out the first array in the array of arrays to get the 'M' value for 'd' attribute
        lineArrays.forEach(array=>{
            startPoints.push(array.shift());
        })

        d3.selectAll('path')
            .data(startPoints)
            .enter()
            .append('path')
                .attr('d',d=> "M "+d[0]+","+d[1]);
        
        d3.selectAll('path')
            .data(lineArrays)
            .enter()
                .lineTo(d => d[0], d => d[1]);
        

    }

}



