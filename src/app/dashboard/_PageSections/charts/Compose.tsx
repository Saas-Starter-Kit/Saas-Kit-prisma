'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer
} from 'recharts';

const data = [
  {
    name: 'Jan',
    uv: 590,
    pv: 800,
    amt: 1400,
    cnt: 490
  },
  {
    name: 'Feb',
    uv: 868,
    pv: 967,
    amt: 1506,
    cnt: 590
  },
  {
    name: 'Mar',
    uv: 1397,
    pv: 1098,
    amt: 989,
    cnt: 350
  },
  {
    name: 'April',
    uv: 1480,
    pv: 1200,
    amt: 1228,
    cnt: 480
  },
  {
    name: 'May',
    uv: 1520,
    pv: 1108,
    amt: 1100,
    cnt: 460
  },
  {
    name: 'June',
    uv: 1400,
    pv: 680,
    amt: 1700,
    cnt: 380
  }
];

const Compose = () => {
  return (
    <Card className="p-4">
      <CardTitle className="mb-6 text-center">Current Sales Growth:</CardTitle>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ComposedChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="name" scale="band" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="pv" barSize={20} fill="#413ea0" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            <Scatter dataKey="cnt" fill="red" />
          </ComposedChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default Compose;
