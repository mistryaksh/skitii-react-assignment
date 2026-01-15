export type SessionRecord = {
  sessionId: string;
  patientId: string;
  date: string;
  durationSeconds: number;
  avgHRV: number;
  painScoreStart: number;
  painScoreEnd: number;
  improvement: number;
  status: "completed";
  musicPlayed: string[];
};

export const sessionHistory: SessionRecord[] = [
  {
    sessionId: "session_100",
    patientId: "PT001",
    date: "2025-01-15T10:00:00",
    durationSeconds: 1500,
    avgHRV: 48,
    painScoreStart: 7,
    painScoreEnd: 4,
    improvement: 43,
    status: "completed",
    musicPlayed: ["Gentle Waves", "Breathing Space", "Deep Rest"],
  },
  {
    sessionId: "session_099",
    patientId: "PT001",
    date: "2025-01-13T14:30:00",
    durationSeconds: 1800,
    avgHRV: 52,
    painScoreStart: 8,
    painScoreEnd: 5,
    improvement: 38,
    status: "completed",
    musicPlayed: ["Uplift", "Gentle Waves"],
  },
];
