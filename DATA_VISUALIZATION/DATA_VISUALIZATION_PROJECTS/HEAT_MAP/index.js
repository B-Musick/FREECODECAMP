console.log('here')
d3.json(
    // COUNTY DATA
    'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
).then(data => {

    // Builds the heat map.
    const createHeatMap = new HeatMap(data);
    createHeatMap.initializeSVG().legend().setTitle().setAxes()
        
        
        
    // .drawlabel().setScales().drawAxes().drawBars().setTooltip().and.animate();
})
    .catch(error => { console.log(error)});

class HeatMap{
    
    constructor(data){
        // Set the data
        this.JSONdata = data;
        this.dateData = this.setDataToDateObjects(data);

        // Set the canvas
        this.svg = d3.select('svg');
       
        // Width and height of canvas
        this.svgWidth = 1000;
        this.svgHeight = 800;
        
        // Padding used to displace the axes 
        this.padding=50;
        this.barWidth = (this.svgWidth-(this.padding)) / (this.dateData.length/8);
        this.barHeight = ((this.svgHeight - (2*this.padding))/12); // Used to give height of the temp bars

        // Title and description
        this.title = d3.select('#title');
        this.description = d3.select('#description');
        this.months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        this.tempColor = this.setTempColors(this.dateData);
        
    }
    
    setDataToDateObjects(data){
        // Create array so data is in array of date objects
        return data.monthlyVariance.map(val=>{
            // Array of array objects consisting of [x,y] or [month,year]
            // Will extract the data using getMonth() and getFullYear()
            let month = new Date();
            month.setMonth(val.month);
            let year = new Date();
            year.setFullYear(val.year);
            let variance = val.variance;
            
            return [year,month,variance];
        })
        
    }

    initializeSVG(){
        console.log(this.dateData)
        // Set up the SVG canvas
        this.svg

            .style('background-color','lightgray');

        return this;
    }

    setTitle(){
        // Initialize the title of the page
        this.title
            .text('Heat Map')
            .style('font-size','20px')
            .style('font-weight', '800');
        this.description.text('This is a heat map from 1753-2015 for all months.')
            .style('font-size', '12px');
        
        return this;
    }

    setTempColors(data){
        // Used to get the color of the data box according to temp variance
        // Also used to provide the min and max temp variances
        // Color is based on the max temp
        
        let baseTemp = 8.66;
        let maxVar = data+=baseTemp;
        let minVar = baseTemp-=data;
        
        // let minimumVar = d3.min(data,d=>d[2]);
        // let maximumVar = d3.max(data, d => d[2]);
        // let max = maximumVar+baseTemp;
        // let min = minimumVar+baseTemp;
        // 1.5255 this is the amounts from 1.6840000000000002 to 13.888
        // console.log((max-min)/8+" this is the amounts from "+min+ " to "+max)
        let min = 1.5255;
        let color;
        
        if(maxVar<min*2){
            color = '#4260f5';
        }else if(maxVar < min * 3){
            color= '#429ef5';
        }else if(maxVar < min * 4){
            color = "#bff542";
        }else if(maxVar < min * 5){
            color = "#f5e042";
        }else if(maxVar < min * 6){
            color= "#f5c842";
        }else if(maxVar < min * 7){
            color= "#f58d42";
        }else{
            color= "#f54e42";
        }

        
        return color;
    }

    setAxes = ()=>{
        // Set the scale from the domain (data values) --> range (screen values)
       
        let xScale = d3.scaleTime()
            // Corresponds to the month 
            // Take the lowest and highest value from teh data, and match it to thepadding and
            // width-padding to the right side
            
            .domain([d3.min(this.dateData, d => d[0]), d3.max(this.dateData, d => d[0])])
            .range([this.padding, this.svgWidth-this.padding]);
        
        let yScale = d3.scaleTime()
            // Corresponds to the month 
            .domain([1, 12])
            .range([this.padding, this.svgHeight - 2*this.padding]);
        
        let setXAxis = d3.axisBottom(xScale);
        let setYAxis = d3.axisLeft(yScale)
            .tickFormat((d) => this.months[d - 1]);
            
        // Tooltip body
        let tooltip = d3
            .select("body")
            .append("div")
            .attr("id", "tooltip")

        this.svg.selectAll('rect')
            .data(this.dateData)
            .enter()
            .append('rect')
                .attr('class', 'cell')
                .attr('x', d => xScale(d[0]))
                .attr('y', d => this.padding+(d[1].getMonth())*this.barHeight)
                .attr('width', this.barWidth)
                
                .attr('height', this.barHeight+"")
                .attr('fill', d=>this.setTempColors(d[2]))
                .attr('data-month', d => d[1].getMonth() + "")
                .attr('data-year', d => d[0].getFullYear() + "")
                .attr('data-temp',d=>8.66+d[2]+"")

                // Tooltip
                .on("mouseover", function (d, i) {
                    // When user hovers over the point
                    d3.select(this).style("fill", "a8eddf"); // Set circle color when hover
                    tooltip.attr("id", "tooltip")
                    tooltip.attr("data-year", d[0].getFullYear())
                    tooltip.style('opacity', 1)
                    tooltip.html("YEAR: " + d[0].getFullYear() + "\n" + "TEMP: " + (Math.round((d[2] + 8.66) * 100) / 100))
                        // This will give the coordinates where mouseevent is and put tooltip there
                        .style("left", ((d3.event.pageX + 15) + "px"))
                        .style("top", (d3.event.pageY - 28) + "px")

                })
                .on("mouseout", function () {
                    // When mouse stops hovering a specific bar
                    d3.select(this)
                        .transition()
                        .duration(400)
                        .style("fill", d => { d[2] });
                    tooltip.style("opacity", 0);
                }) 
        // Y-axis
        this.svg.append('g')
            .attr('transform', "translate(0," + (this.svgHeight - this.padding) + ")") // translate from svg edge to bottom of screen
            .call(setXAxis) // Call function x-axis on elements of selection 'g'
            .attr('id', 'x-axis');

        // X-axis
        // Translate will define location of y-axis by defining (x,y) translation
        // If didnt add padding to x-coordinate, the y-axis is against the screen
        this.svg.append('g')
            .attr('transform', "translate(" + (this.padding) + ", 0)") // translate from svg left edge and y coordinate from top of screen
            .call(setYAxis) // Call function x-axis on elements of selection 'g'
            .attr('id', 'y-axis');
        
    }
    legend() {
        console.log('set legend')
        let legend = this.svg.append('g')
            .attr('id', 'legend');

        // Legend box



        // Coldest legend box, just change x coordinate and fill
        legend.append('rect')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + "")
            .style('fill', '#4260f5')
            .attr('y', this.svgHeight-(this.padding-20)+"")
            .attr('width', this.padding/2+"")
            .attr('height', this.padding/3+"")
            .style('stroke-weight','3')
            .style('stroke','rgb(0,0,0)');
        
        legend.append('text')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + (this.padding / 2)-5  )
            .attr('y', this.svgHeight - (this.padding - 45) + "")
            .style('color', 'black')
            .style('font-size','10')
            .text('3.0');

        legend.append('rect')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + this.padding / 2 + "")
            .style('fill', '#429ef5')
            .attr('y', this.svgHeight - (this.padding - 20) + "")
            .attr('width', this.padding / 2 + "")
            .attr('height', this.padding / 3 + "")
            .style('stroke-weight', '3')
            .style('stroke', 'rgb(0,0,0)');

        legend.append('text')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 2*(this.padding / 2) - 5)
            .attr('y', this.svgHeight - (this.padding - 45) + "")
            .style('color', 'black')
            .style('font-size', '10')
            .text('4.6');

        legend.append('rect')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 2*this.padding/2 + "")
            .style('fill', '#bff542')
            .attr('y', this.svgHeight - (this.padding - 20) + "")
            .attr('width', this.padding / 2 + "")
            .attr('height', this.padding / 3 + "")
            .style('stroke-weight', '3')
            .style('stroke', 'rgb(0,0,0)');
        

        legend.append('text')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 3 * (this.padding / 2) - 5)
            .attr('y', this.svgHeight - (this.padding - 45) + "")
            .style('color', 'black')
            .style('font-size', '10')
            .text('6.1');

        legend.append('rect')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 3 * this.padding / 2 + "")
            .style('fill', '#f5e042')
            .attr('y', this.svgHeight - (this.padding - 20) + "")
            .attr('width', this.padding / 2 + "")
            .attr('height', this.padding / 3 + "")
            .style('stroke-weight', '3')
            .style('stroke', 'rgb(0,0,0)');

        legend.append('text')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 4 * (this.padding / 2) - 5)
            .attr('y', this.svgHeight - (this.padding - 45) + "")
            .style('color', 'black')
            .style('font-size', '10')
            .text('7.6');

        legend.append('rect')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 4 * this.padding / 2 + "")
            .style('fill', '#f5c842')
            .attr('y', this.svgHeight - (this.padding - 20) + "")
            .attr('width', this.padding / 2 + "")
            .attr('height', this.padding / 3 + "")
            .style('stroke-weight', '3')
            .style('stroke', 'rgb(0,0,0)');
        
        legend.append('text')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 5 * (this.padding / 2) - 5)
            .attr('y', this.svgHeight - (this.padding - 45) + "")
            .style('color', 'black')
            .style('font-size', '10')
            .text('9.2');

        legend.append('rect')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 5 * this.padding / 2 + "")
            .style('fill', '#f58d42')
            .attr('y', this.svgHeight - (this.padding - 20) + "")
            .attr('width', this.padding / 2 + "")
            .attr('height', this.padding / 3 + "")
            .style('stroke-weight', '3')
            .style('stroke', 'rgb(0,0,0)');
        
        legend.append('text')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 6 * (this.padding / 2) - 5)
            .attr('y', this.svgHeight - (this.padding - 45) + "")
            .style('color', 'black')
            .style('font-size', '10')
            .text('10.7');

        legend.append('rect')
            .attr('x', ((this.svgWidth / 2) - (this.padding * 4 / 2)) + 6 * this.padding / 2 + "")
            .style('fill', '#f54e42')
            .attr('y', this.svgHeight - (this.padding - 20) + "")
            .attr('width', this.padding / 2 + "")
            .attr('height', this.padding / 3 + "")
            .style('stroke-weight', '3')
            .style('stroke', 'rgb(0,0,0)');
        
        return this;
    }




}
// console.log('here')
// d3.json(
//     'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'
// ).then(data => {

//     // Builds the heat map.
//     const createHeatMap = new HeatMap(data);
//     createHeatMap.initializeSVG()
//         .setTitle()


//     // .drawlabel().setScales().drawAxes().drawBars().setTooltip().and.animate();
// })
//     .catch(error => { console.log(error) });

// class HeatMap {

//     constructor(data) {
//         this.JSONdata = data;
//         this.dateData = this.setDataToDateObjects();
//         this.svg = d3.select('svg');

//         this.svgWidth = 1000;
//         this.svgHeight = 800;

//         this.padding = 50;

//         this.title = d3.select('#title');
//         this.description = d3.select('#description');


//         this.xAxis = this.svg.append('g');
//         this.yAxis = this.svg.append('g');

//         this.scales = this.setScale();
//         this.axes = this.setAxes();



//     }

//     setDataToDateObjects() {
//         // Create array so data is in array of date objects
//         return this.JSONdata.monthlyVariance.map(val => {
//             // Array of array objects consisting of [x,y] or [month,year]
//             // Will extract the data using getMonth() and getFullYear()
//             let month = new Date();
//             month.setMonth(val.month);
//             let year = new Date();
//             year.setFullYear(val.year);

//             return [month, year];
//         })

//     }

//     initializeSVG() {
//         console.log(this.dateData)
//         // Set up the SVG canvas
//         this.svg
//             .attr('width', this.svgWidth)
//             .attr('height', this.svgHeight)
//             .style('background-color', 'lightgray');

//         return this;
//     }

//     setTitle() {
//         // Initialize the title of the page
//         this.title
//             .text('Heat Map')
//             .style('font-size', '20px')
//             .style('font-weight', '800');
//         this.description.text('This is a heat map')
//             .style('font-size', '12px');

//         return this;
//     }

//     setScale = () => {
//         // Set the scale from the domain (data values) --> range (screen values)
//         console.log(this.dateData[0][0].getMonth())
//         let xScale = d3.scaleTime()
//             // Corresponds to the month 
//             // Take the lowest and highest value from teh data, and match it to thepadding and
//             // width-padding to the right side

//             .domain([d3.min(this.dateData, d => d[0]), d3.max(this.dateData, d => d[0])])
//             .range([this.padding, this.svgWidth - this.padding]);

//         let yScale = d3.scaleTime()
//             // Corresponds to the month 
//             .domain([d3.min(this.dateData, d => d[1]), d3.max(this.dateData, d => d[1])])
//             .range([this.padding, this.svgHeight - this.padding]);

//         return [xScale, yScale];
//     }

//     setAxes = () => {
//         let xScale = this.scales[0];
//         let yScale = this.scales[1];
//         console.log(xScale(this.dateData[20][1]))
//         let setXAxis = d3.axisBottom(xScale)
//             .tickFormat(d3.timeFormat('%b'));

//         let setYAxis = d3.axisLeft(yScale)
//             .tickFormat(d3.format("d"));;

//         this.xAxis.attr('transform', "translate(0," + (this.svgHeight - this.padding) + ")") // translate from svg edge to bottom of screen
//             .call(setXAxis) // Call function x-axis on elements of selection 'g'
//             .attr('id', 'x-axis');

//         // Translate will define location of y-axis by defining (x,y) translation
//         // If didnt add padding to x-coordinate, the y-axis is against the screen
//         this.yAxis
//             .attr('transform', "translate(" + (this.padding) + ", 0)") // translate from svg left edge and y coordinate from top of screen
//             .call(setYAxis) // Call function x-axis on elements of selection 'g'
//             .attr('id', 'y-axis');

//         return this;

//     }
// }


/**********************************LEARNED ***************************************
 * When setting the range dont forget the brackets for the array, or else get
 * this error https://stackoverflow.com/questions/46198038/d3-js-error-using-timescale-path-is-nan
 */