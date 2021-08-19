const brush = d3
  .brush()
  .on("start brush", ({ selection }) => brushed(selection))
  .on("end", brushended);

const svg = d3
  .select("body")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const point = svg
  .append("g")
  .attr("fill", "#ccc")
  .attr("stroke", "#777")
  .selectAll("circle")
  .data(data)
  .join("circle")
  .attr("cx", (d) => d[0])
  .attr("cy", (d) => d[1])
  .attr("r", 3.5);

svg.append("g").call(brush).call(brush.move, defaultExtent);

function brushed(selection) {
  point.attr(
    "fill",
    selection && ((d) => (contains(selection, d) ? "red" : null))
  );
}

function brushended({ sourceEvent, selection }) {
  if (!sourceEvent) return; // Only transition after interaction.
  d3.select(this)
    .transition()
    .delay(100)
    .duration(selection ? 750 : 0)
    .call(brush.move, defaultExtent);
}

function contains([[x0, y0], [x1, y1]], [x, y]) {
  return x >= x0 && x < x1 && y >= y0 && y < y1;
}
