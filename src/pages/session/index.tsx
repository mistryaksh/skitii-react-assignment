import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { HRVChart, HRVPanel, SessionHistory } from "@/ui";
import { MusicPlayer } from "@/ui/music-player";
import { useRef, useState } from "react";

export const SessionPage = () => {
  const { user, logout } = useAuth();
  const [hrv, setHRV] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [chartData, setChartData] = useState<{ time: number; hrv: number }[]>(
    []
  );
  const startTimeRef = useRef<number | null>(null);
  const HRV_INTERVAL_MS: number = 3000;
  const [dataSpeed] = useState(HRV_INTERVAL_MS);

  const handleHRVChange = (value: number) => {
    setHRV(value);

    if (!isPlaying) return;

    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now();
    }

    const elapsedSeconds = Math.floor(
      (Date.now() - startTimeRef.current) / 1000
    );

    setChartData((prev) => {
      const next = [...prev, { time: elapsedSeconds, hrv: value }];
      return next.slice(-100);
    });
  };
  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-semibold">Welcome, {user?.name}</h1>
          <p className="text-sm text-slate-500">Music Therapy Session</p>
        </div>
        <Button variant="outline" onClick={logout}>
          Logout
        </Button>
      </header>
      <main className="grid items-center grid-cols-1 lg:grid-cols-2 gap-6">
        <HRVPanel speed={dataSpeed} onHRVChange={handleHRVChange} />
        <MusicPlayer
          playing={isPlaying}
          onPlayChange={setIsPlaying}
          hrv={hrv}
        />
        <div className="lg:col-span-2">
          <HRVChart data={chartData} />
        </div>
        <div className="lg:col-span-2">
          <SessionHistory />
        </div>
      </main>
    </div>
  );
};
