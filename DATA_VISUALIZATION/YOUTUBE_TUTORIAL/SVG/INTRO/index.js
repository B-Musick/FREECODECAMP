
const svg = d3.select('svg');
// svg.style('background-color', 'grey');

// Width and height of svg screen 
const width = parseFloat(svg.attr('width'));
const height = +(svg.attr('height'));

// Group element for mouth 

// translate x and y coordinates so now it is based on center of screen
const g = svg.append('g')
    .attr('transform', `translate(${width / 2},${height / 2})`);
// Center the face (since width of svg = 960, height is 500 )
// Create circle element as child to <svg>
// This will be the main face
// Method chaining
// cx and cy defined by the parent 'g'
const circle = g.append('circle')
    .attr('r', height/2)
    .attr('fill', 'yellow')
    .attr('stroke','black');

// Eyes
const eyeSpacing = 100;
const eyeYOffset = -70;
const eyeRadius = 30;
const eyeBrowHeight = 15;
const eyeBrowWidth = 70;
const eyeBrowOffset = -70;

const eyesG = g
    // Appended to the face (which is based off center)
    .append('g')
        // Offset the eyes 'up' on the screen px
        .attr('transform', `translate(0,${eyeYOffset})`);

const leftEye = eyesG
    // base this off the eyeG group element
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', - eyeSpacing) // Need to off set the x coordinates
    // .attr('cy', eyeYOffset)

const rightEye = eyesG
    .append('circle')
        .attr('r', eyeRadius)
        .attr('cx', eyeSpacing)
    // .attr('cy', eyeYOffset)

rightEye
    .transition().duration(2000)
        .attr('r', eyeRadius-20)
    .transition().duration(2000)
        .attr('r', eyeRadius)

const eyeBrowsG = eyesG
    .append('g')
        .attr('transform', `translate(0,${eyeYOffset})`);

eyeBrowsG
    .transition().duration(2000)
    // Raise eye 50px from current position
        .attr('transform', `translate(0, ${eyeBrowOffset - 50})`)
    .transition().duration(2000)
    // Drop the eye fifty pixels from current position
        .attr('transform', `translate(0, ${eyeBrowOffset})`)


// EYEBROWS
const leftEyebrow = eyeBrowsG
    .append('rect')
        .attr('x', -eyeSpacing - eyeBrowWidth/2)
        // .attr('y', -60)
        .attr('width', eyeBrowWidth)
        .attr('height', eyeBrowHeight)

const rightEyebrow = eyeBrowsG
    .append('rect')
        .attr('x', eyeSpacing - eyeBrowWidth / 2)
        // .attr('y', -60)
        .attr('width', eyeBrowWidth)
        .attr('height', eyeBrowHeight)

// Mouth


const mouth = g
    .append('path')
// 'd' is the attribute that encodes the path
        .attr('d', d3.arc()({
            innerRadius: 80, 
            outerRadius: 100,
            startAngle: Math.PI / 2, // 
            endAngle: Math.PI *3 / 2 // ends angle 

}));

// Ear
const leftEar = g
    .append('path')
        .attr('d', d3.arc()({
            innerRadius: 80,
            outerRadius: 50,
            startAngle: 0, // 
            endAngle: Math.PI // ends angle
    
        }))
        .attr('transform', `translate(${height/2-30}, 10)`)
        .attr('fill', 'orange')

const rightEar = g
    .append('path')
    .attr('d', d3.arc()({
        innerRadius: 80,
        outerRadius: 50,
        startAngle: Math.PI, // 
        endAngle: Math.PI*2 // ends angle

    }))
    .attr('transform', `translate(${-height / 2 + 30}, 10)`)
    .attr('fill', 'orange')


    