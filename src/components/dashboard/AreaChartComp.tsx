import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart,
  Area
} from 'recharts';

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
const AreaChartComp = ({ data, title, dataKey, color, legendLabel, tooltipLabel }: Props) => {
  return (
    <div className="w-full h-auto bg-white shadow-md p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={data}>
          <XAxis dataKey="sku" className="text-xs" />
          <YAxis />
          <Tooltip content={<CustomTooltip tooltipLabel={tooltipLabel} />} />
          <Legend />
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={color}
            name={legendLabel}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChartComp;
