const text = `name,parent
Eve,
Cain,Eve
Seth,Eve
Enos,Seth
Noam,Seth
Abel,Eve
Awan,Eve
Enoch,Awan
Azura,Eve`;

let table = d3.csvParse(text);

console.log(table);

const root = d3
  .stratify()
  .id(function (d) {
    return d.name;
  })
  .parentId(function (d) {
    return d.parent;
  })(table);

console.log(root);
