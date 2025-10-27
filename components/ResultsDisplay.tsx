import React from 'react';
import { AnalysisCard } from './AnalysisCard';
import { PerformanceChart } from './PerformanceChart';
import type { AnalysisResult, AnalysisType } from '../types';

interface ResultsDisplayProps {
  result: AnalysisResult;
  activeTab: AnalysisType;
}

export const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, activeTab }) => {
  if (activeTab === 'performance') {
    const metricsWithChart = result.metrics.filter(
      (metric) => metric.historicalData && metric.historicalData.length > 1
    );
    const allMetrics = result.metrics;

    return (
      <div>
        {metricsWithChart.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Performance Trends</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {metricsWithChart.map((metric, index) => (
                <PerformanceChart key={`chart-${index}`} metric={metric} />
              ))}
            </div>
          </div>
        )}
        <h2 className="text-2xl font-bold text-white mb-4">Metric Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allMetrics.map((metric, index) => (
            <AnalysisCard key={`card-${index}`} metric={metric} />
          ))}
        </div>
      </div>
    );
  }

  // Default display for other tabs
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {result.metrics.map((metric, index) => (
        <AnalysisCard key={index} metric={metric} />
      ))}
    </div>
  );
};