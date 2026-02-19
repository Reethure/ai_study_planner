
import React, { useState } from 'react';
import { Mood, Subject, UserInput, StudyPlan } from './types';
import MoodSelector from './components/MoodSelector';
import SubjectList from './components/SubjectList';
import PlanViewer from './components/PlanViewer';
import { generateStudyPlan } from './services/geminiService';

const App: React.FC = () => {
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [examDate, setExamDate] = useState('');
  const [availableHours, setAvailableHours] = useState<number>(4);
  const [mood, setMood] = useState<Mood>(Mood.NORMAL);
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<StudyPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePlan = async () => {
    if (subjects.length === 0) {
      setError("Please add at least one subject.");
      return;
    }
    if (!examDate) {
      setError("Please select an exam date.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await generateStudyPlan({
        subjects,
        examDate,
        availableHours,
        mood
      });
      setPlan(result);
      // Scroll to plan on mobile
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate plan. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
              <i className="fas fa-feather-pointed"></i>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
              ZenPlan AI
            </h1>
          </div>
          <button 
            onClick={() => setPlan(null)}
            className="text-slate-500 hover:text-indigo-600 transition-colors text-sm font-medium"
          >
            {plan ? "New Plan" : "Guide"}
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Form Side - Hidden if plan exists on mobile/tablet unless reset */}
          <div className={`lg:col-span-5 space-y-8 ${plan ? 'hidden lg:block' : 'block'}`}>
            <section className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
              <div>
                <h2 className="text-lg font-bold text-slate-800 mb-1">Your Focus</h2>
                <p className="text-sm text-slate-500">What are we studying today?</p>
              </div>
              
              <SubjectList subjects={subjects} setSubjects={setSubjects} />

              <div className="space-y-4">
                <label className="block">
                  <span className="text-sm font-bold text-slate-700 block mb-2">Exam Date</span>
                  <input
                    type="date"
                    value={examDate}
                    onChange={(e) => setExamDate(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  />
                </label>

                <label className="block">
                  <span className="text-sm font-bold text-slate-700 block mb-2">Study Hours Today ({availableHours}h)</span>
                  <input
                    type="range"
                    min="1"
                    max="12"
                    step="0.5"
                    value={availableHours}
                    onChange={(e) => setAvailableHours(parseFloat(e.target.value))}
                    className="w-full accent-indigo-600"
                  />
                </label>
              </div>

              <div className="space-y-3">
                <span className="text-sm font-bold text-slate-700 block">Current Energy Level</span>
                <MoodSelector selectedMood={mood} onSelect={setMood} />
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-rose-50 text-rose-500 text-sm flex items-center gap-2">
                  <i className="fas fa-circle-exclamation"></i>
                  {error}
                </div>
              )}

              <button
                onClick={handleCreatePlan}
                disabled={loading}
                className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all transform active:scale-95 shadow-lg shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-3"
              >
                {loading ? (
                  <>
                    <i className="fas fa-circle-notch fa-spin"></i>
                    Crafting Plan...
                  </>
                ) : (
                  <>
                    <i className="fas fa-wand-magic-sparkles"></i>
                    Build My Plan
                  </>
                )}
              </button>
            </section>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7">
            {plan ? (
              <PlanViewer plan={plan} />
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-inner mb-6">
                  <i className="fas fa-calendar-check text-4xl text-indigo-200"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">No Plan Active</h3>
                <p className="text-slate-500 max-w-sm">
                  Fill in your subjects and goals to see a personalized AI study schedule tailored to your energy levels.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-4 text-left">
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                      <i className="fas fa-bolt text-xs"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-700">Mood Aware</h4>
                      <p className="text-xs text-slate-400 leading-tight">Adjusts difficulty based on your tiredness.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-500 flex items-center justify-center shrink-0">
                      <i className="fas fa-hourglass text-xs"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-700">Time Optimized</h4>
                      <p className="text-xs text-slate-400 leading-tight">Focuses on deep work when you are ready.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* Persistent Mobile Action (If not looking at plan) */}
      {!plan && !loading && (
        <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm z-40">
           {/* Visual cues for floating action buttons or quick info could go here */}
        </div>
      )}
    </div>
  );
};

export default App;
