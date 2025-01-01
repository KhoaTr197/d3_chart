export type ChartSettings = {
  width?: number;
  height?: number;
  marginLeft?: number,
  marginRight?: number,
  marginTop?: number,
  marginBottom?: number,
  boundedWidth?: number;
  boundedHeight?: number;
}

export type ChartProps = {
  data: any;
  scale: any;
  id?: string;
  classes?: string;
  config: ChartSettings;
}

export type BarChartProps = ChartProps & {
  field: {
    x: string;
    y: string;
  };
  style?: {
    fontSize?: string;
    barColor?: string;
  };
};

export type LineChartProps = ChartProps & {
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

export type PieChartProps = Omit<ChartProps, "scale"> & {
  style?: {
    fontSize: string;
  };
};