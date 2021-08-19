const dispatch = d3.dispatch("start", "end");

dispatch.on("start", function () {
  console.log("start", this);
});

dispatch.on("start.foo", (e) => {
  console.log("start foo", e);
});

dispatch.on("end", () => {
  console.log("end");
});

dispatch.call("start");

dispatch.call("start", { about: "I am a context object" }, "I am an argument");
