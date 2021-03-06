var dataA = [];
var dataL = [];
var dataR = [];

function addGraph() {
//setting up empty array
getData(); // popuate data 
// line chart based on http://bl.ocks.org/mbostock/3883245
var margin = {
        top: 20,
        right: 20,
        bottom: 30,
        left: 50
    },
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
var x = d3.scale.linear()
    .range([0, width]);
var y = d3.scale.linear()
    .range([height, 0]);
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");
var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");
var line = d3.svg.line()
    .x(function(d) {
        return x(d.q);
    })
    .y(function(d) {
        return y(d.p);
    });

d3.select("svg").remove();
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
x.domain(d3.extent(dataA, function(d) {
    return d.q;
}));
y.domain(d3.extent(dataA, function(d) {
    return d.p;
}));
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);
svg.append("path")
    .datum(dataL)
    .attr("fill", "steelblue")
    .attr("class", "line")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 6)
    .attr("d", line);
svg.append("path")
    .datum(dataR)
    .attr("fill", "red")
    .attr("class", "line")
    .attr("stroke", "red")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 6)
    .attr("d", line);
}

function getData() {
// loop to populate data array with 
// probabily - quantile pairs
dataA = [];
dataL = [];
dataR = [];
var mark = Number(document.getElementById('answer-stwon').innerText);
var lowStd = -6;
var highStd = 6;

for (var q = lowStd; q <= highStd + 0.001; q += 0.1) {
    p = gaussian(q) // calc prob of rand draw
    el = {
        "q": q,
        "p": p
    }
    dataA.push(el)
};
for (var q = lowStd; q <= mark; q += 0.1) {
    p = gaussian(q) // calc prob of rand draw
    el = {
        "q": q,
        "p": p
    }
    dataL.push(el)
};
dataL.push({"q": mark, "p": gaussian(mark)});
dataL.push({"q": mark, "p": 0});

dataR.push({"q": mark, "p": 0});
for (var q = mark; q <= highStd + 0.001; q += 0.1) {
    p = gaussian(q) // calc prob of rand draw
    el = {
        "q": q,
        "p": p
    }
    dataR.push(el)
};
}
//taken from Jason Davies science library
// https://github.com/jasondavies/science.js/
function gaussian(x) {
	var gaussianConstant = 1 / Math.sqrt(2 * Math.PI),
		mean = 0,
    	sigma = 1;
    x = (x - mean) / sigma;
    return gaussianConstant * Math.exp(-.5 * x * x) / sigma;
};

