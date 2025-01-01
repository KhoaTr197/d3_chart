import { useState } from "react";
import { data } from "./data";
import ChartD3 from "./components/ChartD3";
import ScalesD3 from "./components/ScalesD3";
import TransformD3 from "./components/TransformD3";

function App() {
  const [chartData] = useState(JSON.parse(data));
  const [ref, settings] = ChartD3.useChartSettings({
    marginLeft: 32,
    marginRight: 32,
    marginTop: 32,
  });

  const companyNames = chartData.map((item: any) => item.company);
  const initialPrices = TransformD3.sort([0, ...chartData.map((item: any) => item.initial_price)], "asc");
  const dates = chartData.map((item: any) => new Date(item.date));

  const xScale = ScalesD3.band(companyNames, [settings.marginLeft, (settings.width || 0) - settings.marginRight]);
  const yScale = ScalesD3.linear(TransformD3.extent(initialPrices), [(settings.height || 0) - settings.marginBottom, settings.marginTop])
  const dateScale = ScalesD3.utc(TransformD3.extent(dates), [settings.marginLeft, (settings.width || 0) - settings.marginRight]);

  return <div id="app">
    <div
      className="chart-wrap"
      style={{
        width: "90vw",
        height: "90vh",
        maxWidth: "100vw",
        maxHeight: "100vh"
      }}
      ref={ref}
    >
      <ChartD3.Bar
        data={chartData}
        field={{
          x: "company",
          y: "initial_price"
        }}
        scale={{
          x: xScale,
          y: yScale
        }}
        config={settings}
      />
      <ChartD3.Pie 
        data={initialPrices.slice(1, 8)}
        config={settings}
      />
      <ChartD3.Line 
        data={chartData}
        field={{
          x: "date",
          y: "initial_price"
        }}
        scale={{
          x: dateScale,
          y: yScale
        }}
        config={settings}
      />
    </div>
  </div>;
}

export default App;
