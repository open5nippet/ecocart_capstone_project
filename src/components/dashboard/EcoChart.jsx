import React, { useMemo } from 'react'
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

export const LineChartComponent = ({ data, dataKey, stroke = '#22c55e', name = 'Value' }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke={stroke} name={name} />
    </LineChart>
  </ResponsiveContainer>
)

export const BarChartComponent = ({
  data,
  dataKey,
  fill = '#22c55e',
  name = 'Value',
  xAxisKey = 'name',
}) => (
  <ResponsiveContainer width="100%" height={300}>
    <BarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xAxisKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey={dataKey} fill={fill} name={name} />
    </BarChart>
  </ResponsiveContainer>
)

export const PieChartComponent = ({ data, colors = ['#22c55e', '#f59e0b', '#ef4444'] }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie data={data} cx="50%" cy="50%" labelLine={false} label outerRadius={80} fill="#8884d8" dataKey="value">
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
)

export const EcoChart = ({ type = 'line', data, dataKey, title, ...props }) => {
  const ChartComponent = {
    line: LineChartComponent,
    bar: BarChartComponent,
    pie: PieChartComponent,
  }[type] || LineChartComponent

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      {title && <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">{title}</h3>}
      <ChartComponent data={data} dataKey={dataKey} {...props} />
    </div>
  )
}

export default EcoChart
