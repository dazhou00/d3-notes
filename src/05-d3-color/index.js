const color = d3.color("#333");
color.opacity = 0.5;
console.log(color);

const rgb = color.rgb();
console.log(rgb);

const brighter = color.brighter(2);
console.log(brighter);

const darker = color.darker(1);
console.log(darker);
