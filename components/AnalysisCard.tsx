import React from 'react';
import type { Metric } from '../types';

interface AnalysisCardProps {
  metric: Metric;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'text-green-400';
  if (score >= 50) return 'text-yellow-400';
  return 'text-red-400';
};

const ScoreCircle: React.FC<{ score: number }> = ({ score }) => {
    const color = getScoreColor(score);
    const circumference = 2 * Math.PI * 18; // 2 * pi * r
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 40 40">
                <circle
                    className="text-slate-700"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="transparent"
                    r="18"
                    cx="20"
                    cy="20"
                />
                <circle
                    className={`${color} transition-all duration-1000 ease-out`}
                    strokeWidth="4"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="18"
                    cx="20"
                    cy="20"
                />
            </svg>
            <span className={`absolute text-lg font-bold ${color}`}>{score}</span>
        </div>
    );
};

export const AnalysisCard: React.FC<AnalysisCardProps> = ({ metric }) => {
  return (
    <div className="bg-slate-800 rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-brand-primary/20 hover:border-slate-600 border border-slate-700 transition-shadow duration-300">
      <div>
        <div className="flex justify-between items-start gap-4">
            <h3 className="text-lg font-bold text-white mb-1">{metric.name}</h3>
            <ScoreCircle score={metric.score} />
        </div>
        <p className="text-2xl font-semibold text-brand-light mb-4 truncate" title={`${metric.value} ${metric.unit || ''}`.trim()}>
            {String(metric.value)}
            {metric.unit && <span className="text-lg text-slate-400 ml-1">{metric.unit}</span>}
        </p>
        
        <div className="text-sm text-slate-400 space-y-3">
          <p><strong className="text-slate-300 font-semibold">Explanation:</strong> {metric.explanation}</p>
          <p><strong className="text-slate-300 font-semibold">Recommendation:</strong> {metric.recommendation}</p>
        </div>
      </div>
    </div>
  );
};