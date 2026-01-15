import { Button } from "@/components/ui/button";
import { useAuth } from "@/context";
import { HRVPanel } from "@/ui";
import { MusicPlayer } from "@/ui/music-player";
import { useState } from "react";

export const SessionPage = () => {
  const { user, logout } = useAuth();
  const [hrv, setHRV] = useState(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

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
        <HRVPanel onHRVChange={setHRV} />
        <MusicPlayer
          playing={isPlaying}
          onPlayChange={setIsPlaying}
          hrv={hrv}
        />
      </main>
    </div>
  );
};
