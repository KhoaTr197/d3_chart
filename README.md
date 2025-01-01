# KhoaTr197's D3 Chart

## About

This project is a chart module built on D3.js. It provides a set of reusable chart components that can be easily customized and embedded into any React project. The goal is to simplify the process of creating interactive and visually appealing data visualizations.

Feel free to explore the code and contribute to the project!

## Features

- Supports chart types like Line, Bar, and Pie
- Provides scale handlers
- Provides data transformation handlers

## Full Example

For more details, please refer to the manual below this example.

```jsx
import { data } from "./data";
import ChartD3 from "./components/ChartD3";
import ScalesD3 from "./components/ScalesD3";
import TransformD3 from "./components/TransformD3";

const App = () => {
  const [chartData] = useState(JSON.parse(data));
  const [ref, settings] = ChartD3.useChartSettings({
    marginLeft: 32,
    marginRight: 32,
    marginTop: 32,
  });

  const companyNames = chartData.map((item) => item.company);
  const initialPrices = [0, ...chartData.map((item) => item.initial_price)].sort((a, b) => a - b);

  const xScale = ScalesD3.band(companyNames, [
    settings.marginLeft,
    (settings.width || 0) - settings.marginRight,
  ]);
  const yScale = ScalesD3.linear(TransformD3.extent(initialPrices), [
    (settings.height || 0) - settings.marginBottom,
    settings.marginTop,
  ]);

  return (
    <div id="app">
      <div
        className="chart-wrap"
        style={{
          width: "90vw",
          height: "90vh",
          maxWidth: "100vw",
          maxHeight: "100vh",
        }}
        ref={ref}
      >
        <ChartD3.Line
          data={chartData}
          field={{
            x: "date",
            y: "initial_price",
          }}
          scale={{
            x: xScale,
            y: yScale,
          }}
          config={settings}
        />
      </div>
    </div>
  );
};

export default App;
```

## Manual

### ChartD3

`ChartD3` contains three types of charts: `Line`, `Bar`, and `Pie`, along with a custom hook `useChartSettings`.

#### `useChartSettings`

`useChartSettings` is a function that handles the chart's settings, determining how the chart will be rendered. **It needs to be called first before you create a chart.**

`useChartSettings` returns `[ref, settings]`:

- `ref`: A `React ref` ([Read more](https://react.dev/reference/react/useRef)). **It needs to be assigned to the parent element containing your chart because `useChartSettings` can listen to resize events and automatically adjust the width and height (if not set fixed width & height) based on the element you assigned the `ref` to.**
- `settings`: An object containing the chart's information:
  - `width`: Chart's width
  - `height`: Chart's height
  - `marginLeft`, `marginRight`, `marginTop`, `marginBottom`: Space between the chart and its contents
  - `boundedWidth`: Chart's content width
  - `boundedHeight`: Chart's content height

#### Example

```jsx
import ChartD3 from "./ChartD3";

const App = () => {
  const [ref, settings] = ChartD3.useChartSettings({
    width: 400,
    height: 300,
    marginLeft: 32,
    marginRight: 32,
    marginTop: 32,
    marginBottom: 32,
  });

  return <ChartD3.Line ref={ref} config={settings} {...otherProps} />;
};
```

#### `ChartD3.[Line|Bar|Pie]`

To create a chart, `ChartD3` components need to be passed some props.

Common props for all charts:

- `data`: Data you want to visualize **(Required)**
- `id`: Chart's ID (Optional)
- `classes`: Chart's class (Optional)
- `config`: Chart's settings **(Required)**

Specific props for each chart type:

- **`Line`**:
  - `field`: An object specifying the data attributes for the x and y axes. For example, `{ x: "date", y: "value" }`.
  - `scale`: An object specifying the scales for the x and y axes. For example, `{ x: xScale, y: yScale }`.
  - `style`: Line's styles
    - `fontSize`: Line's label font size
    - `lineColor`: Line's color
    - `lineWidth`: Line's width

- **`Bar`**:
  - `field`: An object specifying the data attributes for the x and y axes. For example, `{ x: "category", y: "value" }`.
  - `scale`: An object specifying the scales for the x and y axes. For example, `{ x: xScale, y: yScale }`.
  - `style`: Bar's styles
    - `fontSize`: Bar's label font size
    - `barColor`: Bar's color

- **`Pie`**:
  - `style`: Pie's label styles
    - `fontSize`: Pie's label font size

### Example

```jsx
import { data } from "./data";
import ChartD3 from "./components/ChartD3";
import ScalesD3 from "./components/ScalesD3";

const App = () => {
  const [chartData] = useState(JSON.parse(data));
  const [ref, settings] = ChartD3.useChartSettings({
    marginLeft: 32,
    marginRight: 32,
    marginTop: 32,
    marginBottom: 32,
  });

  const xScale = ScalesD3.band(
    chartData.map((d) => d.category),
    [settings.marginLeft, settings.width - settings.marginRight]
  );
  const yScale = ScalesD3.linear(
    [0, Math.max(...chartData.map((d) => d.value))],
    [settings.height - settings.marginBottom, settings.marginTop]
  );

  return (
    <div ref={ref} style={{ width: "100%", height: "100%" }}>
      <ChartD3.Line
        data={chartData}
        field={{ x: "date", y: "value" }}
        scale={{ x: xScale, y: yScale }}
        config={settings}
        style={{
          fontSize: "21px",
          lineColor: "#000",
          lineWidth: "steelblue",
        }}
      />
      <ChartD3.Bar
        data={chartData}
        field={{ x: "category", y: "value" }}
        scale={{ x: xScale, y: yScale }}
        config={settings}
        style={{
          fontSize: "12px",
          barColor: "steelblue",
        }}
      />
      <ChartD3.Pie
        data={chartData}
        config={settings}
        style={{
          fontSize: "8px",
        }}
      />
    </div>
  );
};

export default App;
```

### ScalesD3

`ScalesD3` provides a set of functions to create scales for your charts. These scales are essential for mapping data values to visual positions.

- **`band(domain, range)`**: Creates a band scale, typically used for categorical data.
  - `domain`: An array of values in the data domain (e.g., categories).
  - `range`: An array of values in the output range (e.g., pixel values).

- **`linear(domain, range)`**: Creates a linear scale, typically used for continuous numerical data.
  - `domain`: An array of two values representing the input data range.
  - `range`: An array of two values representing the output range.

- **`utc(domain, range)`**: Creates a UTC scale, typically used for time-based data.
  - `domain`: An array of two values representing the input data range (e.g., dates).
  - `range`: An array of two values representing the output range (e.g., pixel values).

#### Example

```jsx
import ScalesD3 from "./components/ScalesD3";

const categories = ["A", "B", "C"];
const values = [10, 20, 30];

const xScale = ScalesD3.band(categories, [0, 300]);
const yScale = ScalesD3.linear([0, Math.max(...values)], [300, 0]);
const zScale = ScalesD3.utc(
  [new Date("2023-02-20"), new Date("2024-05-14")],
  [0, 1000]
);

console.log(xScale.scale("A"));
console.log(yScale.scale(10));
console.log(zScale.scale(new Date("2023-12-31")));
```

### TransformD3

`TransformD3` provides utility functions to transform and manipulate your data for better visualization.

- **`extent(array)`**: Calculates the minimum and maximum values in an array.
  - `array`: An array of numerical values.

- **`group(array, key)`**: Groups data by a specified key.
  - `array`: An array of objects.
  - `key`: The key to group by.

- **`sort(array, sortBy)`**: Sorts an array by a specified order.
  - `array`: An array of numerical values.
  - `sortBy`: The order to sort by ("asc" for ascending, "desc" for descending).

#### Example

```jsx
import TransformD3 from "./components/TransformD3";

const data = [
  { category: "A", value: 10 },
  { category: "B", value: 20 },
  { category: "A", value: 30 },
];

const extent = TransformD3.extent(data.map((d) => d.value));
const groupedData = TransformD3.group(data, "category");
const sortedArr = TransformD3.sort([5, 3, 6, 32, 21], "asc");

console.log(extent); // [10, 30]
console.log(groupedData); // { A: [{ category: "A", value: 10 }, { category: "A", value: 30 }], B: [{ category: "B", value: 20 }] }
console.log(sortedArr); // [3, 5, 6, 21, 32]
```
