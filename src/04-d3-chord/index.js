const matrix = [
  [11975, 5871, 8916, 2868],
  [1951, 10048, 2060, 6171],
  [8010, 16145, 8090, 8045],
  [1013, 990, 940, 6907],
];

const chord = d3.chord();
const rmatrix = chord(matrix);
console.log(rmatrix);

const ribbon = d3.ribbon().radius(240).startAngle(0).endAngle(180);

console.log(ribbon(rmatrix));
