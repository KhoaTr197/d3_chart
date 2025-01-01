import {scaleLinear, scaleUtc, scaleBand} from "d3-scale";

interface ScalesD3Type {
  linear: (domain: number[], range: number[]) => any;
  utc: (domain: [Date, Date], range: number[]) => any;
  band: (domain: string[], range: number[]) => any;
}

const ScalesD3: ScalesD3Type = {
  linear: (domain, range) => {
    return {
      type: "linear",
      scale: scaleLinear(domain, range)
    }
  },
  utc: (domain, range) => {
    return {
      type: "utc",
      scale: scaleUtc(domain, range)
    }
  },
  band: (domain, range) => {
    return {
      type: "band",
      scale: scaleBand(domain, range).padding(0.1)
    }
  }
};

export default ScalesD3;