/*
 *    main.js
 *    Mastering Data Visualization with D3.js
 *    Project 1 - Star Break Coffee
 */

const margin = {
  left: 80,
  right: 20,
  top: 50,
  bottom: 100
};

const width = 600 - margin.left - margin.right;
const height = 600 - margin.top - margin.bottom;

// Creating SVG
const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom);

const g = svg
  .append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Labels
g.append("text")
  .attr("y", height + 50)
  .attr("x", width / 2)
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .text("Month");

g.append("text")
  .attr("y", -60)
  .attr("x", -(height / 2))
  .attr("font-size", "20px")
  .attr("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("Revenue ($)");

const data = d3
  .json("data/revenues.json")
  .then(function(data) {
    // Converting String to Float
    data.forEach(d => {
      d.revenue = parseInt(d.revenue);
      d.profit = parseInt(d.profit);
    });

    // Scales
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.month))
      .range([0, width])
      .paddingInner(0.3)
      .paddingOuter(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.revenue)])
      .range([height, 0]);

    // Axis
    const xAxisCall = d3.axisBottom(xScale);
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxisCall);

    const yAxisCall = d3.axisLeft(yScale).tickFormat(function(d) {
      return "$" + d;
    });
    g.append("g")
      .attr("class", "y-axis")
      .call(yAxisCall);

    // Bars
    const bars = g
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", d => xScale(d.month))
      .attr("y", d => yScale(d.revenue))
      .attr("height", d => height - yScale(d.revenue))
      .attr("width", xScale.bandwidth)
      .attr("fill", "#00704A");
  })
  .catch(err => console.log(err));
