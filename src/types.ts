// Chart settings:
// - width: number
// - height: number
// - margin: [top, right, bottom, left]
// - padding: [top, right, bottom, left]
// - boundedWidth: width - margin[left] - margin[right]
// - boundedHeight: height - margin[top] - margin[bottom]

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