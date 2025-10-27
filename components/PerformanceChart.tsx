import React from 'react';
import type { Metric } from '../types';

interface PerformanceChartProps {
  metric: Metric;
}

const getScoreColor = (score: number): string => {
  if (score >= 80) return 'stroke-green-400';
  if (score >= 50) return 'stroke-yellow-400';
  return 'stroke-red-400';
};

const getScoreFillColor = (score: number): string => {
    if (score >= 80) return 'fill-green-400';
    if (score >= 50) return 'fill-yellow-400';
    return 'fill-red-400';
};


export const PerformanceChart: React.FC<PerformanceChartProps> = ({ metric }) => {
  if (!metric.historicalData || metric.historicalData.length < 2) {
    return null;
  }

  const data = metric.historicalData;
  const width = 500;
  const height = 200;
  const padding = 40;

  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const valueRange = maxVal - minVal === 0 ? 1 : maxVal - minVal;

  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * (width - 2 * padding) + padding;
    const y = height - padding - ((value - minVal) / valueRange) * (height - 2 * padding);
    return `${x},${y}`;
  }).join(' ');
  
  const yAxisLabels = [minVal, minVal + valueRange / 2, maxVal].map(v => parseFloat(v.toFixed(2)));

  return (
    <div className="bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h4 className="font-bold text-white">{metric.name}</h4>
          <p className="text-2xl font-semibold text-brand-light">
            {metric.value}
            {metric.unit && <span className="text-lg text-slate-400 ml-1">{metric.unit}</span>}
          </p>
        </div>
        <div className={`text-xl font-bold ${getScoreColor(metric.score).replace('stroke-', 'text-')}`}>{metric.score}/100</div>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto" aria-labelledby={`${metric.name}-title`} role="img">
          <title id={`${metric.name}-title`}>A line chart showing the trend for {metric.name}.</title>
          
          {/* Y-axis labels and grid lines */}
          {yAxisLabels.map((label, i) => {
            const y = height - padding - (i * ((height - 2 * padding) / 2));
            return (
              <g key={`y-label-${i}`}>
                <text x={padding - 10} y={y} textAnchor="end" alignmentBaseline="middle" className="text-xs fill-slate-400">{label}</text>
                <line x1={padding} x2={width - padding} y1={y} y2={y} className="stroke-slate-700" strokeWidth="1" strokeDasharray="2,2" />
              </g>
            )
          })}

          {/* X-axis labels */}
          {data.map((_, index) => {
            const x = (index / (data.length - 1)) * (width - 2 * padding) + padding;
             return (
              <g key={`x-label-${index}`}>
                 <text x={x} y={height - padding + 20} textAnchor="middle" className="text-xs fill-slate-400">
                   {index === 0 ? 'Older' : index === data.length - 1 ? 'Now' : ''}
                 </text>
              </g>
             )
          })}
          
          <polyline
            fill="none"
            className={`${getScoreColor(metric.score)} transition-all duration-1000 ease-out`}
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Data points */}
           {data.map((value, index) => {
            const x = (index / (data.length - 1)) * (width - 2 * padding) + padding;
            const y = height - padding - ((value - minVal) / valueRange) * (height - 2 * padding);
            return <circle key={`point-${index}`} cx={x} cy={y} r="4" className={getScoreFillColor(metric.score)} />;
          })}

        </svg>
      </div>
    </div>
  );
};
