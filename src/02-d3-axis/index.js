const scale = d3.scaleLinear();
const axis = d3.axisLeft(scale);
d3.select("body")
  .append("svg")
  .attr("width", 1440)
  .attr("height", 500)
  .append("g")
  .attr("transform", "translate(0,30)")
  .call(axis);
