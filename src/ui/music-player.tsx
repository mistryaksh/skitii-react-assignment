import { useEffect, useMemo, useState, type FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { musicTracks, type MusicTrack } from "@/mock/musicTracks";
import { PauseIcon, PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

export const MusicPlayer: FC<{
  hrv: number;
  playing: boolean;
  onPlayChange: (val: boolean) => void;
}> = ({ hrv, playing, onPlayChange }) => {
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(musicTracks[0]);
  const [elapsed, setElapsed] = useState(0);

  const adaptation = useMemo<string | null>(() => {
    if (hrv < 30) {
      return "Stress detected. Switching to calmer music to help you relax.";
    }
    if (hrv <= 60) {
      return "Your body is responding well.";
    }
    return "Great! Your relaxation is deepening.";
  }, [hrv]);

  const recommendedTracks = useMemo(() => {
    return musicTracks.filter(
      (t) => hrv >= t.forHRVRange[0] && hrv <= t.forHRVRange[1]
    );
  }, [hrv]);

  const upNextTracks = useMemo(() => {
    const sameRange = recommendedTracks.filter((t) => t.id !== currentTrack.id);

    if (sameRange.length >= 2) return sameRange.slice(0, 2);

    const fallback = musicTracks.filter((t) => t.id !== currentTrack.id);

    return [...sameRange, ...fallback].slice(0, 2);
  }, [recommendedTracks, currentTrack.id]);

  const handlePlayToggle = () => {
    if (!playing) {
      const next = recommendedTracks[0];
      if (next && next.id !== currentTrack.id) {
        setCurrentTrack(next);
        setElapsed(0);
      }
    }

    onPlayChange(!playing);
  };

  useEffect(() => {
    if (!playing) return;

    const interval = setInterval(() => {
      setElapsed((prev) =>
        prev >= currentTrack.duration ? currentTrack.duration : prev + 1
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [playing, currentTrack.duration]);

  const progressPercent = Math.min(
    (elapsed / currentTrack.duration) * 100,
    100
  );

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>Adaptive Music Therapy</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {adaptation && (
          <Alert>
            <AlertTitle>Music Adapted</AlertTitle>
            <AlertDescription>
              <p>{adaptation}</p>
              <p className="text-sm text-slate-600">
                {currentTrack.title} • {currentTrack.tempo} BPM
              </p>
            </AlertDescription>
          </Alert>
        )}

        <div>
          <h2 className="text-lg font-semibold">{currentTrack.title}</h2>
          <p className="text-sm text-slate-500">{currentTrack.therapyGoal}</p>
        </div>

        <div className="grid grid-cols-3 text-sm">
          <div>
            <strong>BPM:</strong> {currentTrack.tempo}
          </div>
          <div>
            <strong>Key:</strong> {currentTrack.key}
          </div>
          <div>
            <strong>Mood:</strong> {currentTrack.mood}
          </div>
        </div>

        <div className="space-y-1">
          <Progress value={progressPercent} className="h-2" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>{formatTime(elapsed)}</span>
            <span>{formatTime(currentTrack.duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="border-primary"
              onClick={handlePlayToggle}
            >
              {playing ? (
                <>
                  <PauseIcon /> Pause
                </>
              ) : (
                <>
                  <PlayIcon /> Play
                </>
              )}
            </Button>
            <span
              className={cn(
                "text-sm",
                playing ? "text-green-600" : "text-yellow-600"
              )}
            >
              {playing && `Playing ${currentTrack.title}...`}
            </span>
          </div>
          {!playing && (
            <Alert className="border-yellow-500 p-1.5 px-5">
              <AlertTitle>
                Music is paused. Tap Play to begin your therapy session.
              </AlertTitle>
            </Alert>
          )}
        </div>

        <div>
          <h4 className="font-medium mb-1">Up Next :</h4>
          <ul className="text-slate-600 space-y-1">
            <div>
              {upNextTracks.map((t) => (
                <div className="flex items-center justify-between">
                  <div>
                    {t.title} • {t.tempo} BPM
                  </div>
                  <div>{t.mood}</div>
                </div>
              ))}
            </div>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
