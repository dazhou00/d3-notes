const data = [
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 39.1,
    culmen_depth_mm: 18.7,
    flipper_length_mm: 181,
    body_mass_g: 3750,
    sex: "MALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 39.5,
    culmen_depth_mm: 17.4,
    flipper_length_mm: 186,
    body_mass_g: 3800,
    sex: "FEMALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 40.3,
    culmen_depth_mm: 18,
    flipper_length_mm: 195,
    body_mass_g: 3250,
    sex: "FEMALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: NaN,
    culmen_depth_mm: NaN,
    flipper_length_mm: NaN,
    body_mass_g: NaN,
    sex: null,
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 36.7,
    culmen_depth_mm: 19.3,
    flipper_length_mm: 193,
    body_mass_g: 3450,
    sex: "FEMALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 39.3,
    culmen_depth_mm: 20.6,
    flipper_length_mm: 190,
    body_mass_g: 3650,
    sex: "MALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 38.9,
    culmen_depth_mm: 17.8,
    flipper_length_mm: 181,
    body_mass_g: 3625,
    sex: "FEMALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 39.2,
    culmen_depth_mm: 19.6,
    flipper_length_mm: 195,
    body_mass_g: 4675,
    sex: "MALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 34.1,
    culmen_depth_mm: 18.1,
    flipper_length_mm: 193,
    body_mass_g: 3475,
    sex: null,
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 42,
    culmen_depth_mm: 20.2,
    flipper_length_mm: 190,
    body_mass_g: 4250,
    sex: null,
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 37.8,
    culmen_depth_mm: 17.1,
    flipper_length_mm: 186,
    body_mass_g: 3300,
    sex: null,
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 37.8,
    culmen_depth_mm: 17.3,
    flipper_length_mm: 180,
    body_mass_g: 3700,
    sex: null,
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 41.1,
    culmen_depth_mm: 17.6,
    flipper_length_mm: 182,
    body_mass_g: 3200,
    sex: "FEMALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 38.6,
    culmen_depth_mm: 21.2,
    flipper_length_mm: 191,
    body_mass_g: 3800,
    sex: "MALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 34.6,
    culmen_depth_mm: 21.1,
    flipper_length_mm: 198,
    body_mass_g: 4400,
    sex: "MALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 36.6,
    culmen_depth_mm: 17.8,
    flipper_length_mm: 185,
    body_mass_g: 3700,
    sex: "FEMALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 38.7,
    culmen_depth_mm: 19,
    flipper_length_mm: 195,
    body_mass_g: 3450,
    sex: "FEMALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 42.5,
    culmen_depth_mm: 20.7,
    flipper_length_mm: 197,
    body_mass_g: 4500,
    sex: "MALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 34.4,
    culmen_depth_mm: 18.4,
    flipper_length_mm: 184,
    body_mass_g: 3325,
    sex: "FEMALE",
  },
  {
    species: "Adelie",
    island: "Torgersen",
    culmen_length_mm: 46,
    culmen_depth_mm: 21.5,
    flipper_length_mm: 194,
    body_mass_g: 4200,
    sex: "MALE",
  },
  {
    species: "Adelie",
    island: "Biscoe",
    culmen_length_mm: 37.7,
    culmen_depth_mm: 18.7,
    flipper_length_mm: 180,
    body_mass_g: 3600,
    sex: "MALE",
  },
  {
    species: "Adelie",
    island: "Biscoe",
    culmen_length_mm: 35.9,
    culmen_depth_mm: 19.2,
    flipper_length_mm: 189,
    body_mass_g: 3800,
    sex: "FEMALE",
  },
];

const width = 954,
  padding = 25;

let columns = [
  "culmen_length_mm",
  "culmen_depth_mm",
  "flipper_length_mm",
  "body_mass_g",
];

const size =
  (width - (columns.length + 1) * padding) / columns.length + padding;

const x = columns.map((c) =>
  d3
    .scaleLinear()
    .domain(d3.extent(data, (d) => d[c]))
    .rangeRound([padding / 2, size - padding / 2])
);

const y = x.map((x) => x.copy().range([size - padding / 2, padding / 2]));

const z = d3
  .scaleOrdinal()
  .domain(data.map((d) => d.species))
  .range(d3.schemeCategory10);

axis = d3
  .axisBottom()
  .ticks(6)
  .tickSize(size * columns.length);

const xAxis = (g) =>
  g
    .selectAll("g")
    .data(x)
    .join("g")
    .attr("transform", (d, i) => `translate(${i * size},0)`)
    .each(function (d) {
      return d3.select(this).call(axis.scale(d));
    })
    .call((g) => g.select(".domain").remove())
    .call((g) => g.selectAll(".tick line").attr("stroke", "#ddd"));

const yAxis = (g) =>
  g
    .selectAll("g")
    .data(y)
    .join("g")
    .attr("transform", (d, i) => `translate(0,${i * size})`)
    .each(function (d) {
      return d3.select(this).call(axis.scale(d));
    })
    .call((g) => g.select(".domain").remove())
    .call((g) => g.selectAll(".tick line").attr("stroke", "#ddd"));
