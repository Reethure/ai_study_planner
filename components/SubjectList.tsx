
import React, { useState } from 'react';
import { Subject } from '../types';

interface SubjectListProps {
  subjects: Subject[];
  setSubjects: (subjects: Subject[]) => void;
}

const SubjectList: React.FC<SubjectListProps> = ({ subjects, setSubjects }) => {
  const [newSubject, setNewSubject] = useState('');

  const addSubject = () => {
    if (newSubject.trim()) {
      setSubjects([...subjects, { 
        id: Math.random().toString(36).substr(2, 9), 
        name: newSubject.trim(), 
        difficulty: 'medium' 
      }]);
      setNewSubject('');
    }
  };

  const removeSubject = (id: string) => {
    setSubjects(subjects.filter(s => s.id !== id));
  };

  const updateDifficulty = (id: string, difficulty: 'easy' | 'medium' | 'hard') => {
    setSubjects(subjects.map(s => s.id === id ? { ...s, difficulty } : s));
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="Enter subject name (e.g., Biology)"
          className="flex-1 p-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          onKeyDown={(e) => e.key === 'Enter' && addSubject()}
        />
        <button
          onClick={addSubject}
          className="bg-indigo-600 text-white px-5 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>

      <div className="space-y-2 max-h-48 overflow-y-auto">
        {subjects.map((subject) => (
          <div key={subject.id} className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-100 shadow-sm">
            <span className="font-medium text-slate-700">{subject.name}</span>
            <div className="flex items-center gap-3">
              <select
                value={subject.difficulty}
                onChange={(e) => updateDifficulty(subject.id, e.target.value as any)}
                className="text-xs bg-slate-50 p-1 rounded border border-slate-200 outline-none"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              <button
                onClick={() => removeSubject(subject.id)}
                className="text-rose-400 hover:text-rose-600 p-1"
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubjectList;
