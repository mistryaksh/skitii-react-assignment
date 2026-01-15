import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";

type ChartPoint = {
  time: number;
  hrv: number;
};

export const HRVChart: FC<{ data: ChartPoint[] }> = ({ data }) => {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>HRV Trend (Last 5 Minutes)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart width={500} height={260} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickFormatter={formatTime}
              tick={{ fontSize: 12 }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[20, 80]}
              label={{
                value: "HRV (ms)",
                angle: -90,
                style: { marginRight: 200 },
              }}
            />
            <Tooltip />

            <ReferenceArea y1={20} y2={30} fill="#f8d7da" />
            <ReferenceArea y1={30} y2={60} fill="#d1e7dd" />
            <ReferenceArea y1={60} y2={80} fill="#dbeafe" />

            <Line
              strokeWidth={2}
              type="monotone"
              dataKey="hrv"
              stroke="#2563eb"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
