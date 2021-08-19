const data = [
  { name: "chevrolet chevelle malibu", x: 18, y: 130 },
  { name: "buick skylark 320", x: 15, y: 165 },
  { name: "plymouth satellite", x: 18, y: 150 },
  { name: "amc rebel sst", x: 16, y: 150 },
  { name: "ford torino", x: 17, y: 140 },
  { name: "ford galaxie 500", x: 15, y: 198 },
  { name: "chevrolet impala", x: 14, y: 220 },
  { name: "plymouth fury iii", x: 14, y: 215 },
  { name: "pontiac catalina", x: 14, y: 225 },
  { name: "amc ambassador dpl", x: 15, y: 190 },
  { name: "citroen ds-21 pallas", x: 0, y: 115 },
  { name: "chevrolet chevelle concours (sw)", x: 0, y: 165 },
  { name: "ford torino (sw)", x: 0, y: 153 },
  { name: "plymouth satellite (sw)", x: 0, y: 175 },
  { name: "amc rebel sst (sw)", x: 0, y: 175 },
  { name: "dodge challenger se", x: 15, y: 170 },
  { name: "plymouth 'cuda 340", x: 14, y: 160 },
  { name: "ford mustang boss 302", x: 0, y: 140 },
  { name: "chevrolet monte carlo", x: 15, y: 150 },
  { name: "buick estate wagon (sw)", x: 14, y: 225 },
  { name: "toyota corona mark ii", x: 24, y: 95 },
  { name: "plymouth duster", x: 22, y: 95 },
  { name: "amc hornet", x: 18, y: 97 },
];

const height = 600,
  width = 600;
const margin = { top: 20, right: 30, bottom: 30, left: 30 };

const x = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.x))
  .nice()
  .range([margin.left, width - margin.right]);

const y = d3
  .scaleLinear()
  .domain(d3.extent(data, (d) => d.y))
  .nice()
  .range([height - margin.bottom, margin.top]);

const xAxis = (g) =>
  g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .append("text")
        .attr("x", width - margin.right)
        .attr("y", -4)
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "end")
        .text(data.x)
    );

const yAxis = (g) =>
  g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y))
    .call((g) => g.select(".domain").remove())
    .call((g) =>
      g
        .select(".tick:last-of-type text")
        .clone()
        .attr("x", 4)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(data.y)
    );

const svg = d3
  .select("body")
  .append("svg")
  .attr("viewBox", [0, 0, width, height])
  .property("value", []);

const brush = d3.brush().on("start brush end", brushed);

svg.append("g").call(xAxis);

svg.append("g").call(yAxis);

const dot = svg
  .append("g")
  .attr("fill", "none")
  .attr("stroke", "steelblue")
  .attr("stroke-width", 1.5)
  .selectAll("circle")
  .data(data)
  .join("circle")
  .attr("transform", (d) => `translate(${x(d.x)},${y(d.y)})`)
  .attr("r", 3);

svg.call(brush);

svg.node();

function brushed({ selection }) {
  let value = [];
  if (selection) {
    const [[x0, y0], [x1, y1]] = selection;
    value = dot
      .style("stroke", "gray")
      .filter((d) => x0 <= x(d.x) && x(d.x) < x1 && y0 <= y(d.y) && y(d.y) < y1)
      .style("stroke", "steelblue")
      .data();
  } else {
    dot.style("stroke", "steelblue");
  }
  svg.property("value", value).dispatch("input");
}
