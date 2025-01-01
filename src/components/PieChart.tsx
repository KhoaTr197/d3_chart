import {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import { ChartProps } from '../types';

type PieChartProps = Omit<ChartProps, "scale"> & {
  style?: {
    fontSize: string;
  };
}

const PieChart = ({
  id = '',
  classes = '',
  data,
  config,
  style,
}: PieChartProps) => {
  const styles = {
    fontSize: "12px",
    ...style,
  }

  const ref = useRef<SVGSVGElement>(null);

  const diameter = Math.min(config.boundedWidth || 0, config.boundedHeight || 0) / 2;

  useEffect(() => {
    if(!ref.current) return;

    //generate color scale
    const color = d3.scaleOrdinal(
      data,
      d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
    );

    //generate data with angel values
    const arcs = d3.pie<number>().sort(null).value(d => d)(data);

    //create arc labels generator
    const arc = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(0)
      .outerRadius(diameter / 2);

    //create arc labels generator
    const arcLabel = d3.arc<d3.PieArcDatum<number>>()
      .innerRadius(diameter / 2 * 0.8)
      .outerRadius(diameter / 2 * 0.8)

    //render pie arcs
    d3.select(ref.current)
      .append("g")
        .attr("stroke", "white")
      .selectAll()
      .data(arcs)
      .join("path")
        .attr("fill", d => color(d.data))
        .attr("d", arc)
    
    //render arc labels
    d3.select(ref.current)
      .append("g")
      .selectAll()
      .data(arcs)
      .join("text")
        //center label in the arc
        .attr("transform", d => `translate(${arcLabel.centroid(d)})`)
        .call(text => 
          text.append("tspan")
          .attr("font-size", styles.fontSize)
          .attr("x", "-1em")
          .attr("font-weight", "bold")
          .text(d => d.data)
    )

    //clean up
    return () => {
      d3.select(ref.current).selectAll("g").remove();
      d3.select(ref.current).selectAll("path").remove();
    }
  }, [data])

  return (
    <svg
      id={id}
      className={classes}
      width={diameter}
      height={diameter}
      viewBox={`${-diameter/2} ${-diameter/2} ${diameter} ${diameter}`}
      ref={ref}
    >
    </svg>
  )
}
export default PieChart