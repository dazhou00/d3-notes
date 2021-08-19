const svg = d3
  .select("body")
  .append("svg")
  .attr("viewBox", [-padding, 0, width, width]);

svg
  .append("style")
  .text(`circle.hidden { fill: #000; fill-opacity: 1; r: 1px; }`);

svg.append("g").call(xAxis);

svg.append("g").call(yAxis);

const cell = svg
  .append("g")
  .selectAll("g")
  .data(d3.cross(d3.range(columns.length), d3.range(columns.length)))
  .join("g")
  .attr("transform", ([i, j]) => `translate(${i * size},${j * size})`);

cell
  .append("rect")
  .attr("fill", "none")
  .attr("stroke", "#aaa")
  .attr("x", padding / 2 + 0.5)
  .attr("y", padding / 2 + 0.5)
  .attr("width", size - padding)
  .attr("height", size - padding);

cell.each(function ([i, j]) {
  d3.select(this)
    .selectAll("circle")
    .data(data.filter((d) => !isNaN(d[columns[i]]) && !isNaN(d[columns[j]])))
    .join("circle")
    .attr("cx", (d) => x[i](d[columns[i]]))
    .attr("cy", (d) => y[j](d[columns[j]]));
});

const circle = cell
  .selectAll("circle")
  .attr("r", 3.5)
  .attr("fill-opacity", 0.7)
  .attr("fill", (d) => z(d.species));

cell.call(brush, circle, svg);

function brush(cell, circle, svg) {
  const brush = d3
    .brush()
    .extent([
      [padding / 2, padding / 2],
      [size - padding / 2, size - padding / 2],
    ])
    .on("start", brushstarted)
    .on("brush", brushed)
    .on("end", brushended);

  cell.call(brush);

  let brushCell;

  // Clear the previously-active brush, if any.
  function brushstarted() {
    if (brushCell !== this) {
      d3.select(brushCell).call(brush.move, null);
      brushCell = this;
    }
  }
  // Highlight the selected circles.
  function brushed({ selection }, [i, j]) {
    let selected = [];
    if (selection) {
      const [[x0, y0], [x1, y1]] = selection;
      circle.classed(
        "hidden",
        (d) =>
          x0 > x[i](d[columns[i]]) ||
          x1 < x[i](d[columns[i]]) ||
          y0 > y[j](d[columns[j]]) ||
          y1 < y[j](d[columns[j]])
      );
      selected = data.filter(
        (d) =>
          x0 < x[i](d[columns[i]]) &&
          x1 > x[i](d[columns[i]]) &&
          y0 < y[j](d[columns[j]]) &&
          y1 > y[j](d[columns[j]])
      );
    }
    svg.property("value", selected).dispatch("input");
  }

  // If the brush is empty, select all circles.
  function brushended({ selection }) {
    if (selection) return;
    svg.property("value", []).dispatch("input");
    circle.classed("hidden", false);
  }
}
