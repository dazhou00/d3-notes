const height = 100,
  width = 100;

const margin = { top: 10, right: 20, bottom: 20, left: 20 };

const x = d3.scaleLinear([0, 10], [margin.left, width - margin.right]);
const rx = d3.randomUniform(...x.domain());

const ry = d3.randomNormal(height / 2, height / 12);

const xAxis = (g) =>
  g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));
