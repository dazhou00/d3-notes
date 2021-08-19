const width = 1000,
  height = width;
const radius = 32,
  maxDistance = Infinity;

const context = document.getElementById("canvas").getContext("2d");
const canvas = context.canvas;

const drag = (circles) => {
  function dragsubject(event) {
    let subject = null;
    let distance = maxDistance;
    for (const c of circles) {
      let d = Math.hypot(event.x - c.x, event.y - c.y);
      if (d < distance) {
        distance = d;
        subject = c;
      }
    }
    return subject;
  }

  function dragstarted(event) {
    circles.splice(circles.indexOf(event.subject), 1);
    circles.push(event.subject);
    event.subject.active = true;
  }

  function dragged(event) {
    event.subject.x = Math.max(0, Math.min(width, event.x));
    event.subject.y = Math.max(0, Math.min(height, event.y));
  }

  function dragended(event) {
    event.subject.active = false;
  }

  return d3
    .drag()
    .subject(dragsubject)
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended);
};

const circles = (canvas.value = d3.range(20).map((i) => ({
  x: Math.random() * (width - radius * 2) + radius,
  y: Math.random() * (height - radius * 2) + radius,
  color: d3.schemeCategory10[i % 10],
})));

function render() {
  context.clearRect(0, 0, width, height);
  for (const { x, y, color, active } of circles) {
    context.beginPath();
    context.moveTo(x + radius, y);
    context.arc(x, y, radius, 0, 2 * Math.PI);
    context.fillStyle = color;
    context.fill();
    if (active) {
      context.lineWidth = 2;
      context.stroke();
    }
  }
  canvas.dispatchEvent(new CustomEvent("input"));
}

d3.select(context.canvas).call(
  drag(circles).on("start.render drag.render end.render", render)
);

render();
