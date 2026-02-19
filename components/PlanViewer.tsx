
import React from 'react';
import { StudyPlan } from '../types';

interface PlanViewerProps {
  plan: StudyPlan;
}

const PlanViewer: React.FC<PlanViewerProps> = ({ plan }) => {
  return (
    <div className="animate-fadeIn space-y-8">
      {/* Header Quote */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white shadow-xl">
        <div className="absolute top-0 right-0 p-8 opacity-10">
          <i className="fas fa-quote-right text-9xl"></i>
        </div>
        <h2 className="text-xl font-bold mb-4 relative z-10 flex items-center gap-2">
          <i className="fas fa-sparkles"></i>
          Your Daily Strategy
        </h2>
        <p className="text-2xl font-light italic leading-relaxed mb-6 relative z-10">
          "{plan.motivationalQuote}"
        </p>
        <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-medium">
          <i className="fas fa-brain"></i>
          {plan.moodInsight}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Total Time</span>
          <span className="text-2xl font-bold text-slate-800">{plan.totalStudyTime}h</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Sessions</span>
          <span className="text-2xl font-bold text-slate-800">{plan.dailySchedule.filter(b => !b.isBreak).length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Breaks</span>
          <span className="text-2xl font-bold text-slate-800">{plan.dailySchedule.filter(b => b.isBreak).length}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
          <span className="text-slate-400 text-xs uppercase tracking-wider font-bold mb-1">Status</span>
          <span className="text-emerald-500 font-bold">Optimized</span>
        </div>
      </div>

      {/* Timetable */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 px-1">
          <i className="fas fa-clock text-indigo-500"></i>
          Schedule Timeline
        </h3>
        <div className="space-y-3">
          {plan.dailySchedule.map((block, idx) => (
            <div 
              key={idx} 
              className={`flex items-stretch gap-4 p-4 rounded-2xl border transition-all hover:shadow-md ${
                block.isBreak 
                  ? 'bg-slate-50 border-slate-200' 
                  : 'bg-white border-slate-100'
              }`}
            >
              <div className="flex flex-col items-center justify-center min-w-[80px] text-slate-500">
                <span className="text-sm font-bold">{block.startTime}</span>
                <div className="w-px h-full bg-slate-200 my-1"></div>
                <span className="text-xs">{block.endTime}</span>
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`font-bold ${block.isBreak ? 'text-slate-500' : 'text-slate-800'}`}>
                    {block.activity}
                  </h4>
                  {block.intensity && !block.isBreak && (
                    <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                      block.intensity === 'high' ? 'bg-rose-100 text-rose-600' :
                      block.intensity === 'moderate' ? 'bg-amber-100 text-amber-600' :
                      'bg-emerald-100 text-emerald-600'
                    }`}>
                      {block.intensity} Intensity
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 flex items-center gap-2">
                  <i className={`fas ${block.isBreak ? 'fa-mug-hot' : 'fa-book-open'} opacity-70`}></i>
                  {block.subject} • {block.durationMinutes} mins
                </p>
              </div>

              {!block.isBreak && (
                <div className="flex items-center px-2">
                  <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 hover:bg-indigo-100 hover:text-indigo-600 transition-colors">
                    <i className="fas fa-check"></i>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlanViewer;
