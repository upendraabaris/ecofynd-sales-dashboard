import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  AreaChart
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

const ProfitChart = ({ data, title, dataKey, color, legendLabel, tooltipLabel }: Props) => {
  return (
    <div className="w-full h-80 bg-white shadow-md p-4 rounded-xl">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="sku" className='text-xs'/>
          <YAxis />
          <Tooltip content={<CustomTooltip tooltipLabel={tooltipLabel} />} />
          <Legend />
          <Bar dataKey={dataKey} fill={color} name={legendLabel} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProfitChart;
