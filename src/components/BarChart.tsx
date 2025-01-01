import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { BarChartProps } from "../index.d";
import { wrapText } from "./utils";

const BarChart = ({
  data,
  field,
  scale,
  config,
  id = "",
  classes = "",
  style,
}: BarChartProps) => {
  const { x, y } = scale;

  const styles = {
    fontSize: "12px",
    barColor: "steelblue",
    ...style,
  };

  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;

    //render x axis
    d3.select(ref.current)
      .append("g")
      .attr(
        "transform",
        `translate(0,${(config.height || 0) - (config.marginBottom || 0)})`
      )
      .call(d3.axisBottom(x.scale))
      //remove the domain line
      .call((g) => g.select(".domain").remove())
      //style the ticks
      .call((g) =>
        g
          .selectAll(".tick text")
          .attr("font-size", styles.fontSize)
          .each(function () {
            wrapText.call(this as SVGTextElement);
          })
      );

    //render y axis
    d3.select(ref.current)
      .append("g")
      .attr("transform", `translate(${config.marginLeft},0)`)
      //render axis that spans the width of the chart
      .call(d3.axisLeft(y.scale).tickSize(-(config.boundedWidth || 0)))
      //remove the domain line
      .call((g) => g.select(".domain").remove())
      //style the ticks
      .call((g) => g.selectAll(".tick text").attr("font-size", styles.fontSize))
      //style the tick lines
      .call((g) =>
        g
          .selectAll(".tick:not(:first-child) line")
          .attr("stroke-opacity", 0.5)
          .attr("stroke-dasharray", "2,2")
      );

    //render bars
    d3.select(ref.current)
      .append("g")
      .selectAll()
      .data(data)
      .join("rect")
      .attr("fill", styles.barColor)
      .attr("x", (d: any) => x.scale(d[field.x]))
      .attr("y", (d: any) => y.scale(d[field.y]))
      .attr("height", (d: any) =>
        y.scale(0) - y.scale(d[field.y]) > 0
          ? y.scale(0) - y.scale(d[field.y])
          : 0
      )
      .attr("width", x.scale.bandwidth());

    //clean up
    return () => {
      d3.select(ref.current).selectAll("g").remove();
      d3.select(ref.current).selectAll("path").remove();
    };
  }, [scale]);

  return (
    <svg
      id={id}
      className={classes}
      width={config.width}
      height={config.height}
      viewBox={`0 0 ${config.width} ${config.height}`}
      ref={ref}
    ></svg>
  );
};

export default BarChart;
