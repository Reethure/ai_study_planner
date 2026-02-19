
import React from 'react';
import { Mood } from '../types';

interface MoodSelectorProps {
  selectedMood: Mood;
  onSelect: (mood: Mood) => void;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onSelect }) => {
  const moods = [
    { type: Mood.TIRED, icon: 'fa-battery-quarter', label: 'Tired', color: 'text-amber-500', bg: 'bg-amber-50' },
    { type: Mood.NORMAL, icon: 'fa-battery-half', label: 'Normal', color: 'text-blue-500', bg: 'bg-blue-50' },
    { type: Mood.FOCUSED, icon: 'fa-battery-full', label: 'Focused', color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="grid grid-cols-3 gap-3">
      {moods.map((m) => (
        <button
          key={m.type}
          type="button"
          onClick={() => onSelect(m.type)}
          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${
            selectedMood === m.type 
              ? `border-indigo-600 ${m.bg} ring-2 ring-indigo-200` 
              : 'border-slate-100 bg-white hover:border-slate-200'
          }`}
        >
          <i className={`fas ${m.icon} text-2xl mb-2 ${m.color}`}></i>
          <span className="text-sm font-medium text-slate-700">{m.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
