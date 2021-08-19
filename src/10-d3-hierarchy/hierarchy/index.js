const data = {
  name: "Eve",
  children: [
    {
      name: "Cain",
    },
    {
      name: "Seth",
      children: [
        {
          name: "Enos",
        },
        {
          name: "Noam",
        },
      ],
    },
    {
      name: "Abel",
    },
    {
      name: "Awan",
      children: [
        {
          name: "Enoch",
        },
      ],
    },
    {
      name: "Azura",
    },
  ],
};
const nodes = d3.hierarchy(data);
console.log(nodes);

console.log(nodes.ancestors());
console.log(nodes.descendants());
console.log(nodes.leaves());
