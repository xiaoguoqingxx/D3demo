d3.select("body")
.selectAll("p")
.data([4, 8, 15, 16, 23, 42])
.enter().append("p")
.text("12345678");
console.log(d3.selectAll("p"))
// d3.select("body").transition().duration(2000).style("background-color", "black");

