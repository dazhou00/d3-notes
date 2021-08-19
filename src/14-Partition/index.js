const root = pack(data);

const svg = d3.create("svg");

function autoBox() {
  document.body.appendChild(this);
  return [0, 0, width, height];
}

svg
  .append("filter")
  .append("feDropShadow")
  .attr("flood-opacity", 0.3)
  .attr("dx", 0)
  .attr("dy", 1);

const node = svg
  .selectAll("g")
  .data(d3.group(root.descendants(), (d) => d.height))
  .join("g")
  .selectAll("g")
  .data((d) => d[1])
  .join("g")
  .attr("transform", (d) => `translate(${d.x + 1},${d.y + 1})`);

node
  .append("circle")
  .attr("r", (d) => d.r)
  .attr("fill", (d) => color(d.height));

const leaf = node.filter((d) => !d.children);

leaf.select("circle");

leaf.append("clipPath").append("use");

leaf
  .append("text")
  .attr("clip-path", (d) => d.clipUid)
  .selectAll("tspan")
  .data((d) => d.data.name.split(/(?=[A-Z][a-z])|\s+/g))
  .join("tspan")
  .attr("x", 0)
  .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
  .text((d) => d);

node.append("title").text(
  (d) =>
    `${d
      .ancestors()
      .map((d) => d.data.name)
      .reverse()
      .join("/")}\n${format(d.value)}`
);

svg
  .attr("viewBox", autoBox)
  .style("font", "10px sans-serif")
  .attr("text-anchor", "middle")
  .node();
