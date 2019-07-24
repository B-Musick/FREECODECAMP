
const svg = d3.select('svg');
svg.style('background-color', 'grey');

// Create circle element as child to <svg>
//  This will be the main face
const circle = svg.append('circle');
const width = parseFloat(svg.attr('width'));
const height = +(svg.attr('height'));
circle.attr('r', 250); // Add radius attribute with value 200

// Center the face (since width of svg = 960, height is 500 )
circle.attr('cx', 960/2);
circle.attr('cy', 500 / 2);