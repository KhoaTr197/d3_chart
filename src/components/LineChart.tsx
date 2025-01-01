import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { ChartProps } from "../types";
import { wrapText } from "./utils";

type LineChartProps = ChartProps & {
  field: {
    x: string;
    y: string;
  };
  style?: {
    fontSize: string;
    lineColor: string;
    lineWidth: number;
  };
};

const LineChart = ({
  data,
  field,
  scale,
  config,
  style
}: LineChartProps) => {

  const { x, y } = scale;

  const styles = {
    fontSize: "12px",
    lineColor: "steelblue",
    lineWidth: "1.5",
    ...style,
  }

  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    //create line generator
    const line = d3.line(
      (d:any) => {
        if(x.type === "utc")
          return x.scale(new Date(d[field.x]))
        else
          return x.scale(d[field.x])
      },
      (d:any) => {
        if(y.type === "utc")
          return y.scale(new Date(d[field.y]))
        else
          return y.scale(d[field.y])
      }
    )

    //render axis y
    d3.select(ref.current)
      .append("g")
        .attr("transform", `translate(${config.marginLeft},0)`)
        //render axis that spans the width of the chart
        .call(
          d3.axisLeft(y.scale)
          .tickSize(-(config.boundedWidth || 0))
        )
        //remove the domain line
        .call(g => g.select(".domain").remove())
        //style the ticks
        .call(g =>
          g.selectAll(".tick text")
          .attr("font-size", 12)
        )
        //style the tick lines
        .call(
          g => g.selectAll(".tick:not(:first-child) line")
          .attr("stroke-opacity", 0.5)
          .attr("stroke-dasharray", "2,2")
        )

    //render axis x
    d3.select(ref.current)
      .append("g")
        .attr("transform", `translate(0,${(config.height || 0) - (config.marginBottom || 0)})`)
        .call(d3.axisBottom(x.scale))
        //remove the domain line
        .call((g) => g.select(".domain").remove())
        //style the ticks
        .call((g) =>
          g.selectAll(".tick text")
            .attr("font-size", styles.fontSize)
            .each(function () {
              wrapText.call(this as SVGTextElement);
            })
        );
    
    //render line
    d3.select(ref.current)
      .append("path")
        .attr("transform", `translate(0,0)`)
        .attr("fill", "none")
        .attr("stroke", styles.lineColor)
        .attr("stroke-width", styles.lineWidth)
        .attr("d", line(data))

    //clean up
    return () => {
      d3.select(ref.current).selectAll("g").remove();
      d3.select(ref.current).selectAll("path").remove();
    }
  }, [scale]);

  return (
    <svg
      width={config.width}
      height={config.height}
      viewBox={`0 0 ${config.width} ${config.height}`}
      ref={ref}
    >
    </svg>
  );
};
export default LineChart;
