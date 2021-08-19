const svg = d3
  .select("body")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

brush = d3
  .brushX()
  .extent([
    [margin.left, margin.top],
    [width - margin.right, height - margin.bottom],
  ])
  .on("start brush end", brushed);

const circle = svg
  .append("g")
  .attr("fill-opacity", 0.2)
  .selectAll("circle")
  .data(Float64Array.from({ length: 800 }, rx))
  .join("circle")
  .attr("transform", (d) => `translate(${x(d)},${ry()})`)
  .attr("r", 1);

svg.append("g").call(xAxis);

svg
  .append("g")
  .call(brush)
  .call(brush.move, [3, 5].map(x))
  .on("dblclick", dblclicked);

function dblclicked() {
  const selection = d3.brushSelection(this) ? null : x.range();
  d3.select(this).call(brush.move, selection);
}

function brushed({ selection }) {
  if (selection === null) {
    circle.attr("stroke", null);
  } else {
    const [x0, x1] = selection.map(x.invert);
    circle.attr("stroke", (d) => (x0 <= d && d <= x1 ? "red" : null));
  }
}
