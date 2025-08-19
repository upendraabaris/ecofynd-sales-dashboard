import { ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

type Props = {
  data: any[],
  title: string,
  dataKey: string,
  color: string,
  legendLabel: string,
  tooltipLabel?: string
};

const CustomTooltip = ({ active, payload, label, tooltipLabel }: any) => {
  if (!active || !payload || !payload.length) return null;

  const value = payload[0].value;

  return (
    <div style={{
      backgroundColor: 'white',
      border: '1px solid #ccc',
      padding: 8,
      borderRadius: 4,
    }}>
      <p style={{ margin: 0 }}><strong>{label}</strong></p>
      <p style={{ color: '#333', margin: 0 }}>
        {tooltipLabel ?? 'Value'} : {value}
      </p>
    </div>
  );
};

const COLORS = [
  '#A5D8FF', // Light Blue
  '#B5F5EC', // Light Teal
  '#FFD6A5', // Light Orange
  '#FFADAD', // Light Pink
  '#E2F0CB', // Light Green
  '#FFC6FF', // Light Purple
  '#FDFFB6', // Light Yellow
];

const PieChartComp = ({ data, title, dataKey, color, legendLabel, tooltipLabel }: Props) => {
  return (
    <div className="w-full h-auto bg-white shadow-md p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Tooltip content={<CustomTooltip tooltipLabel={tooltipLabel} />} />
          <Legend />
          <Pie
            data={data}
            dataKey={dataKey}
            nameKey="sku"
            outerRadius={100}
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]} // cycle colors
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartComp;
