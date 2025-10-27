import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { UrlInputForm } from './components/UrlInputForm';
import { AnalysisTabs } from './components/AnalysisTabs';
import { ResultsDisplay } from './components/ResultsDisplay';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { WelcomeScreen } from './components/WelcomeScreen';
import { analyzeWebsite } from './services/geminiService';
import type { AnalysisType, AnalysisResult } from './types';

const App: React.FC = () => {
  const [url, setUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<AnalysisType>('on-page');
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = useCallback(async (newUrl: string) => {
    if (!newUrl) {
      setError('Please enter a valid website URL.');
      return;
    }
    
    // Simple URL validation
    if (!/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(newUrl)) {
      setError('The entered URL is not valid. Please include http:// or https://');
      return;
    }

    setUrl(newUrl);
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);

    try {
      const result = await analyzeWebsite(newUrl, activeTab);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError('An error occurred during analysis. The website may be inaccessible or the API may be unavailable.');
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  const handleTabChange = useCallback(async (newTab: AnalysisType) => {
    setActiveTab(newTab);
    if (url) {
      // Re-run analysis for the new tab
      setIsLoading(true);
      setError(null);
      setAnalysisResult(null);
      try {
        const result = await analyzeWebsite(url, newTab);
        setAnalysisResult(result);
      } catch (err) {
        console.error(err);
        setError('An error occurred while switching analysis type.');
      } finally {
        setIsLoading(false);
      }
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-slate-900 font-sans flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-5xl flex-grow">
        <div className="bg-slate-800 p-6 md:p-8 rounded-2xl shadow-2xl shadow-slate-950/50">
          <UrlInputForm onAnalyze={handleAnalyze} isLoading={isLoading} />
          {error && <ErrorMessage message={error} />}
          {url && !isLoading && !error && (
            <AnalysisTabs activeTab={activeTab} onTabChange={handleTabChange} />
          )}
        </div>
        <div className="mt-8">
          {isLoading ? (
            <LoadingSpinner />
          ) : analysisResult ? (
            <ResultsDisplay result={analysisResult} activeTab={activeTab} />
          ) : (
            !error && <WelcomeScreen />
          )}
        </div>
      </main>
      <footer className="text-center py-8 mt-8 border-t border-slate-800 text-sm text-slate-500">
        <div className="max-w-5xl mx-auto px-4 space-y-1">
            <p className="font-semibold text-slate-400 text-base mb-2">Senternet Technologies</p>
            <p>Aranthangi</p>
            <p>
              <a href="tel:8190038085" className="hover:text-brand-primary transition-colors">Contact: 8190038085</a>
              <span className="mx-2">|</span>
              <a href="mailto:senternettechnologies@gmail.com" className="hover:text-brand-primary transition-colors">Email: senternettechnologies@gmail.com</a>
            </p>
            <p className="pt-4 text-xs text-slate-600">Powered by Google Gemini. Analysis may not be 100% accurate.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;