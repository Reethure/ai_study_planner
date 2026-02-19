
import { GoogleGenAI, Type } from "@google/genai";
import { UserInput, StudyPlan } from "../types";

export const generateStudyPlan = async (userInput: UserInput): Promise<StudyPlan> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    Act as a professional Academic Success Coach and Study Architect.
    Generate a personalized daily study timetable based on these details:
    - Subjects: ${userInput.subjects.map(s => `${s.name} (${s.difficulty})`).join(', ')}
    - Target Exam Date: ${userInput.examDate}
    - Available Study Hours: ${userInput.availableHours}
    - Current Student Mood/Energy: ${userInput.mood}

    Constraints:
    1. If mood is "tired", focus on light revision, summaries, and more frequent breaks.
    2. If mood is "normal", use a balanced mix of new material and review.
    3. If mood is "focused", schedule deep work, problem-solving, and complex topics first.
    4. Include short 5-10 minute breaks every 45-60 minutes (Pomodoro style).
    5. Ensure the schedule fits exactly within the ${userInput.availableHours} hours total.
    6. Provide a single motivational quote relevant to the student's situation.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          motivationalQuote: { type: Type.STRING },
          moodInsight: { type: Type.STRING },
          totalStudyTime: { type: Type.NUMBER },
          dailySchedule: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                startTime: { type: Type.STRING },
                endTime: { type: Type.STRING },
                activity: { type: Type.STRING },
                subject: { type: Type.STRING },
                durationMinutes: { type: Type.NUMBER },
                isBreak: { type: Type.BOOLEAN },
                intensity: { type: Type.STRING, enum: ['light', 'moderate', 'high'] }
              },
              required: ['startTime', 'endTime', 'activity', 'subject', 'durationMinutes', 'isBreak', 'intensity']
            }
          }
        },
        required: ['motivationalQuote', 'moodInsight', 'dailySchedule', 'totalStudyTime']
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text);
};
