const height = 120,
  width = 100;

const margin = { top: 10, right: 20, bottom: 20, left: 20 };

const interval = d3.timeHour.every(12);

const x = d3
  .scaleTime()
  .domain([new Date(2013, 7, 1), new Date(2013, 7, width / 60) - 1])
  .rangeRound([margin.left, width - margin.right]);

const xAxis = (g) =>
  g
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call((g) =>
      g
        .append("g")
        .call(
          d3
            .axisBottom(x)
            .ticks(interval)
            .tickSize(-height + margin.top + margin.bottom)
            .tickFormat(() => null)
        )
        .call((g) =>
          g.select(".domain").attr("fill", "#ddd").attr("stroke", null)
        )
        .call((g) =>
          g
            .selectAll(".tick line")
            .attr("stroke", "#fff")
            .attr("stroke-opacity", (d) => (d <= d3.timeDay(d) ? 1 : 0.5))
        )
    )
    .call((g) =>
      g
        .append("g")
        .call(d3.axisBottom(x).ticks(d3.timeDay).tickPadding(0))
        .attr("text-anchor", null)
        .call((g) => g.select(".domain").remove())
        .call((g) => g.selectAll("text").attr("x", 6))
    );
