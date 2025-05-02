import React from "react";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => (
  <h1 className="text-2xl font-bold text-white">{text}</h1>
);

interface BarChartProps {
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ title }) => (
  <div className="text-white">
    <h2 className="text-xl font-semibold mb-4">{title}</h2>
    {/* Add actual chart implementation here */}
    <div className="h-40 bg-gray-700 rounded-lg flex items-end p-4 gap-2">
      <div className="flex-1 bg-blue-500 h-[60%]" />
      <div className="flex-1 bg-blue-500 h-[80%]" />
      <div className="flex-1 bg-blue-500 h-[40%]" />
      <div className="flex-1 bg-blue-500 h-[90%]" />
    </div>
  </div>
);

interface DataTableProps {
  columns: string;
}

const DataTable: React.FC<DataTableProps> = ({ columns }) => (
  <div className="text-white">
    <table className="w-full">
      <thead>
        <tr>
          {columns.split(",").map((col, i) => (
            <th key={i} className="text-left p-2 border-b border-gray-700">
              {col.trim()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {/* Add actual data rows here */}
        <tr>
          <td className="p-2 border-b border-gray-700">John Doe</td>
          <td className="p-2 border-b border-gray-700">30</td>
          <td className="p-2 border-b border-gray-700">London</td>
        </tr>
      </tbody>
    </table>
  </div>
);

interface ButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label }) => (
  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
    {label}
  </button>
);

type ComponentProps = HeaderProps | BarChartProps | DataTableProps | ButtonProps;

// Registry mapping component types to their React components
export const componentRegistry: Record<string, React.FC<ComponentProps>> = {
  Header,
  BarChart,
  DataTable,
  Button,
};
