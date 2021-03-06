const root = treemap(data);

const svg = d3.create("svg");

function autoBox() {
  document.body.appendChild(this);
  return [0, 0, width, height];
}

const leaf = svg
  .selectAll("g")
  .data(root.leaves())
  .join("g")
  .attr("transform", (d) => `translate(${d.x0},${d.y0})`);

leaf.append("title").text(
  (d) =>
    `${d
      .ancestors()
      .reverse()
      .map((d) => d.data.name)
      .join("/")}\n${format(d.value)}`
);

leaf
  .append("rect")
  .attr("id", (d) => d.leafUid)
  .attr("fill", (d) => {
    while (d.depth > 1) d = d.parent;
    return color(d.data.name);
  })
  .attr("fill-opacity", 0.6)
  .attr("width", (d) => d.x1 - d.x0)
  .attr("height", (d) => d.y1 - d.y0);

leaf
  .append("clipPath")
  .attr("id", (d) => d.clipUid)
  .append("use")
  .attr("xlink:href", (d) => d.leafUid);

leaf
  .append("text")
  .attr("clip-path", (d) => d.clipUid)
  .selectAll("tspan")
  .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g).concat(format(d.value)))
  .join("tspan")
  .attr("x", 3)
  .attr(
    "y",
    (d, i, nodes) => `${(i === nodes.length - 1) * 0.3 + 0.9 + i * 0.9}em`
  )
  .attr("fill-opacity", (d, i, nodes) => (i === nodes.length - 1 ? 0.7 : null))
  .text((d) => d);

svg.attr("viewBox", autoBox).style("font", "10px sans-serif").node();
