const svg = d3.select('svg');

let startX = 100;
let startY = 700;

// Method-chaining
const circle = svg
    .append('circle')
        .attr('r', 30)
        .attr('cx', startX)
        .attr('cy', startY);

// Projectile Motion
let time = 1;
let velocity = 0.00001;
let newX = 0;

while(newX <1000){
    newX += startX + velocity*time;

    circle
        .transition()
            .attr('cx', newX);
    
    time+=0.0000001;
}