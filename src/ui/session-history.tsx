import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sessionHistory } from "@/mock/sessionHistory";
import moment from "moment";

function formatDuration(seconds: number) {
  const min = Math.floor(seconds / 60);
  return `${min} minutes`;
}

function hrvColor(hrv: number) {
  if (hrv < 30) return "destructive";
  if (hrv <= 60) return "default";
  return "secondary";
}

export const SessionHistory = () => {
  return (
    <Card className="rounded-sm">
      <CardHeader>
        <CardTitle>Session History</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="grid grid-cols-2 gap-6">
          {sessionHistory.map((session) => (
            <div
              key={session.sessionId}
              className="border rounded-sm p-2 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {moment(session.date).format("lll")}(
                    {moment(session.date).fromNow()})
                  </p>
                  <p className="text-sm text-slate-500">
                    Duration: {formatDuration(session.durationSeconds)}
                  </p>
                </div>

                <Badge variant={hrvColor(session.avgHRV)}>
                  Avg HRV: {session.avgHRV} ms
                </Badge>
              </div>

              <div className="flex justify-between text-sm">
                <span>
                  Pain: {session.painScoreStart} → {session.painScoreEnd}
                </span>
                <span className="text-green-600">
                  {session.improvement}% improvement
                </span>
              </div>

              <div className="text-sm text-slate-600">
                Music: {session.musicPlayed.join(", ")}
              </div>

              <div className="flex justify-end">
                <Badge variant="outline">{session.status}</Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
