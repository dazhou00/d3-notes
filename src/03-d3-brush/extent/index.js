const svg = d3
  .select("body")
  .append("svg")
  .attr("viewBox", [0, 0, width, height]);

const brush = d3
  .brushX()
  .extent([
    [margin.left, margin.top],
    [width - margin.right, height - margin.bottom],
  ])
  .on("brush", brushed);

svg.append("g").call(xAxis);

svg.append("g").call(brush);

function brushed(event) {
  if (event.sourceEvent && event.sourceEvent.type === "brush") return;
  const d0 = event.selection.map(x.invert);
  const d1 = d0.map(interval.round);

  // If empty when rounded, use floor instead.
  if (d1[0] >= d1[1]) {
    d1[0] = interval.floor(d0[0]);
    d1[1] = interval.offset(d1[0]);
  }

  d3.select(this).call(brush.move, d1.map(x));
}
