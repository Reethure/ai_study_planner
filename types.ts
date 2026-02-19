
export enum Mood {
  TIRED = 'tired',
  NORMAL = 'normal',
  FOCUSED = 'focused'
}

export interface Subject {
  id: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserInput {
  subjects: Subject[];
  examDate: string;
  availableHours: number;
  mood: Mood;
}

export interface StudyBlock {
  startTime: string;
  endTime: string;
  activity: string;
  subject: string;
  durationMinutes: number;
  isBreak: boolean;
  intensity: 'light' | 'moderate' | 'high';
}

export interface StudyPlan {
  motivationalQuote: string;
  moodInsight: string;
  dailySchedule: StudyBlock[];
  totalStudyTime: number;
}
