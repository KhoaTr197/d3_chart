import BarChart from "./BarChart";
import PieChart from "./PieChart";
import LineChart from "./LineChart";
import { useChartSettings } from "../hook/useChartSettings";

export default {
  Line: LineChart,
  Bar: BarChart,
  Pie: PieChart,
  useChartSettings: useChartSettings
}