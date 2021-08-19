const width = 600,
  height = 600;

const data = Array.from({ length: 2000 }, () => [
  Math.random() * width,
  Math.random() * height,
]);

const defaultExtent = [
  [width * 0.1, width * 0.1],
  [width * 0.3, width * 0.3],
];
