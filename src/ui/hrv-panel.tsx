import { useEffect, useRef, useState } from "react";
import { MoveDown, MoveUp } from "lucide-react";
import { Alert } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Card, CardTitle, CardHeader, CardContent } from "@/components/ui/card";

type HRVReading = {
  value: number;
  timestamp: string;
  status: "low" | "normal" | "high";
  deviceConnected: boolean;
};

function calculateStatus(value: number): HRVReading["status"] {
  if (value < 30) return "low";
  if (value <= 60) return "normal";
  return "high";
}

function generateHRVReading(prev?: number): HRVReading {
  const delta = Math.floor(Math.random() * 7) - 3;
  const value = Math.min(75, Math.max(25, (prev ?? 45) + delta));

  return {
    value,
    timestamp: new Date().toISOString(),
    status: calculateStatus(value),
    deviceConnected: Math.random() > 0.1,
  };
}

export const HRVPanel: React.FC<{
  onHRVChange?: (value: number) => void;
  speed: number;
}> = ({ onHRVChange, speed }) => {
  const [current, setCurrent] = useState<HRVReading>(() =>
    generateHRVReading()
  );
  const [trend, setTrend] = useState<"up" | "down" | null>(null);
  const prevValue = useRef<number>(current.value);

  useEffect(() => {
    const interval = setInterval(() => {
      const next = generateHRVReading(prevValue.current);

      setTrend(next.value > prevValue.current ? "up" : "down");
      prevValue.current = next.value;
      setCurrent(next);
      onHRVChange?.(next.value);
    }, speed);

    return () => clearInterval(interval);
  }, [onHRVChange, speed]);

  const statusColor =
    current.status === "low"
      ? "destructive"
      : current.status === "normal"
      ? "default"
      : "secondary";

  return (
    <Card className="space-y-0 rounded-sm">
      <CardHeader className="mb-0 pb-0">
        <CardTitle className="text-xl font-semibold">
          Heart Rate Variability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-0 mt-0 pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-3xl font-bold">{current.value} ms </p>
            {trend === "up" ? <MoveUp /> : trend === "down" ? <MoveDown /> : ""}
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <p className="text-sm text-slate-500">Current HRV</p>
          <Badge variant={statusColor}>{current.status.toUpperCase()}</Badge>
        </div>

        <div className="text-sm">
          Device Status:{" "}
          <span
            className={
              current.deviceConnected ? "text-green-600" : "text-amber-600"
            }
          >
            {current.deviceConnected ? "Connected" : "Disconnecting..."}
          </span>
        </div>

        {current.status === "low" && (
          <Alert>
            We’ve detected some stress. Try deep breathing. Switching to calming
            music.
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};
