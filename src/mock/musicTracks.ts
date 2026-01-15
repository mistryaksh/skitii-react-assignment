export type MusicTrack = {
  id: string;
  title: string;
  therapyGoal: string;
  tempo: number;
  key: string;
  mood: string;
  duration: number;
  forHRVRange: [number, number];
};

export const musicTracks: MusicTrack[] = [
  {
    id: "track_001",
    title: "Gentle Waves",
    therapyGoal: "Pain Relief",
    tempo: 58,
    key: "C Major",
    mood: "Calming",
    duration: 300,
    forHRVRange: [20, 45],
  },
  {
    id: "track_002",
    title: "Breathing Space",
    therapyGoal: "Anxiety Reduction",
    tempo: 62,
    key: "G Major",
    mood: "Grounding",
    duration: 240,
    forHRVRange: [25, 50],
  },
  {
    id: "track_003",
    title: "Uplift",
    therapyGoal: "Mood Enhancement",
    tempo: 75,
    key: "D Major",
    mood: "Uplifting",
    duration: 300,
    forHRVRange: [45, 80],
  },
];
