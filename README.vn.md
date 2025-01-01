# KhoaTr197's D3 Chart

[![en](https://img.shields.io/badge/lang-en-red.svg)](./README.md)

## Giới thiệu

Dự án này là một module biểu đồ được xây dựng trên D3.js. Nó cung cấp một tập hợp các thành phần biểu đồ có thể tái sử dụng, dễ dàng tùy chỉnh và nhúng vào bất kỳ dự án React nào. Mục tiêu là đơn giản hóa quá trình tạo các hình ảnh hóa dữ liệu tương tác và hấp dẫn.

Hãy thoải mái khám phá mã nguồn và đóng góp cho dự án!

## Tính năng

- Hỗ trợ các loại biểu đồ như Line, Bar và Pie
- Cung cấp các scale handlers
- Cung cấp các data transformation handlers

## Cách sử dụng

**Cài đặt package qua npm:**

```sh
npm install d3_chart_khoatr
```

## Ví dụ đầy đủ

Để biết thêm chi tiết, vui lòng tham khảo hướng dẫn dưới ví dụ này.

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

## Hướng dẫn

### ChartD3

`ChartD3` chứa ba loại biểu đồ: `Line`, `Bar`, and `Pie`, cùng với một custom hook `useChartSettings`.

#### `useChartSettings`

`useChartSettings` là một function xử lý các thiết lập của biểu đồ, xác định cách biểu đồ sẽ được render. **Nó cần được gọi đầu tiên trước khi bạn tạo biểu đồ.**

`useChartSettings` returns `[ref, settings]`:

- `ref`: Một `React ref` ([Read more](https://react.dev/reference/react/useRef)). **Nó cần được gán cho phần tử cha chứa biểu đồ của bạn vì `useChartSettings` có thể lắng nghe các sự kiện thay đổi kích thước và tự động điều chỉnh chiều rộng và chiều cao (nếu không đặt cố định chiều rộng & chiều cao) dựa trên phần tử mà bạn gán `ref` cho**
- `settings`: Một object chứa thông tin của biểu đồ:
  - `width`: Chiều rộng của biểu đồ
  - `height`: Chiều cao của biểu đồ
  - `marginLeft`, `marginRight`, `marginTop`, `marginBottom`: Khoảng cách giữa biểu đồ và nội dung của nó
  - `boundedWidth`: Chiều rộng nội dung của biểu đồ
  - `boundedHeight`: Chiều cao nội dung của biểu đồ

#### Ví dụ

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

Để tạo một biểu đồ, các thành phần `ChartD3` cần được truyền một số props.

Các props chung cho tất cả các biểu đồ:

- `data`: Dữ liệu bạn muốn hiển thị **(Bắt buộc)**
- `id`: ID của biểu đồ (Tùy chọn)
- `classes`: Lớp của biểu đồ (Tùy chọn)
- `config`: Thiết lập của biểu đồ **(Bắt buộc)**

Các props cụ thể cho từng loại biểu đồ:

- **`Line`**:
  - `field`: Một object chỉ định các thuộc tính dữ liệu cho trục x và y. Ví dụ, `{ x: "date", y: "value" }`.
  - `scale`: Một object chỉ định các scales cho trục x và y. Ví dụ, `{ x: xScale, y: yScale }`.
  - `style`: Style của biểu đồ đường
    - `fontSize`: Kích thước font của tên vạch trên trục
    - `lineColor`: Màu của đường
    - `lineWidth`: Độ rộng của đường

- **`Bar`**:
  - `field`: Một object chỉ định các thuộc tính dữ liệu cho trục x và y. Ví dụ, `{ x: "category", y: "value" }`.
  - `scale`: Một object chỉ định các scales cho trục x và y. Ví dụ, `{ x: xScale, y: yScale }`.
  - `style`: Style của biểu đồ cột
    - `fontSize`: Kích thước font của tên vạch trên trục
    - `barColor`: Màu của cột

- **`Pie`**:
  - `style`: Style của biểu đồ tròn
    - `fontSize`: Kích thước font của giá trị trên cung tròn

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

`ScalesD3` cung cấp một tập hợp các function để tạo scales cho biểu đồ của bạn. Các scales này rất cần thiết để ánh xạ các giá trị dữ liệu tới các vị trí trực quan.

- **`band(domain, range)`**:  Tạo một band scale, thường được sử dụng cho dữ liệu phân loại.
  - `domain`: Một mảng các giá trị trong miền dữ liệu (ví dụ, các danh mục).
  - `range`: Một mảng các giá trị trong miền đầu ra (ví dụ, các giá trị pixel).

- **`linear(domain, range)`**: Tạo một linear scale, thường được sử dụng cho dữ liệu số liên tục.
  - `domain`: Một mảng hai giá trị đại diện cho miền dữ liệu đầu vào.
  - `range`: Một mảng hai giá trị đại diện cho miền đầu ra.

- **`utc(domain, range)`**: Tạo một UTC scale, thường được sử dụng cho dữ liệu dựa trên thời gian.
  - `domain`: Một mảng hai giá trị đại diện cho miền dữ liệu đầu vào (ví dụ, các ngày).
  - `range`: Một mảng hai giá trị đại diện cho miền đầu ra (ví dụ, các giá trị pixel).

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

`TransformD3` cung cấp các utility function để biến đổi và xử lý dữ liệu của bạn để hiển thị tốt hơn.

- **`extent(array)`**: Tính toán giá trị nhỏ nhất và lớn nhất trong một mảng.
  - `array`: Một mảng các giá trị số.

- **`group(array, key)`**: Nhóm dữ liệu theo một key xác địn
  - `array`: Một mảng các object.
  - `key`: Key để nhóm theo.

- **`sort(array, sortBy)`**: Sắp xếp một mảng theo thứ tự xác định.
  - `array`: Một mảng các giá trị số.
  - `sortBy`: Thứ tự để sắp xếp ("asc" cho tăng dần, "desc" cho giảm dần).

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
