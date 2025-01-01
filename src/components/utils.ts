import * as d3 from "d3";

export const wrapText = function (this: SVGTextElement | undefined) {
  if (!this) return;

  const text: any = d3.select(this);
  const words = text.text().split(/\s+/).reverse();
  let word;
  let line = [];
  let lineNumber = 0;
  const lineHeight = 1.1; // ems
  const y = text.attr("y");
  const dy = parseFloat(text.attr("dy"));
  let tspan = text
    .text(null)
    .append("tspan")
    .attr("x", 0)
    .attr("y", y)
    .attr("dy", `${dy}em`);

  while ((word = words.pop())) {
    line.push(word);
    tspan.text(line.join(" "));
    if (tspan.node().getComputedTextLength() > 8) {
      line.pop();
      tspan.text(line.join(" "));
      line = [word];
      tspan = text
        .append("tspan")
        .attr("x", 0)
        .attr("y", y)
        .attr("dy", `${++lineNumber * lineHeight + dy}em`)
        .text(word);
    }
  }
};