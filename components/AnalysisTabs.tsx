
import React from 'react';
import type { AnalysisType } from '../types';

interface AnalysisTabsProps {
  activeTab: AnalysisType;
  onTabChange: (tab: AnalysisType) => void;
}

const tabs: { id: AnalysisType; label: string }[] = [
  { id: 'on-page', label: 'On-Page SEO' },
  { id: 'off-page', label: 'Off-Page SEO' },
  { id: 'content', label: 'Content' },
  { id: 'performance', label: 'Performance' },
];

export const AnalysisTabs: React.FC<AnalysisTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="mt-6 border-b border-slate-700">
      <nav className="-mb-px flex space-x-4 overflow-x-auto" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`${
              activeTab === tab.id
                ? 'border-brand-primary text-brand-primary'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
            } whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors duration-200`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};
