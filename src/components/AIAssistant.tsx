import React, { useState } from 'react';
import { Sparkles, Clipboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { analyzeText } from '../utils/api';

interface AIAssistantProps {
  onFillForm: (data: {
    name: string;
    address: string;
    phone1: string;
    phone2: string;
    amount: string;
    productDesc: string;
  }) => void;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onFillForm }) => {
  const { t } = useTranslation();
  const [customerText, setCustomerText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const handleAnalyze = async () => {
    if (!customerText.trim()) {
      setError(t('ai.errorEmptyText'));
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const result = await analyzeText(customerText);
      if (Object.values(result).some(value => value)) {
        onFillForm(result);
        setCustomerText('');
      } else {
        setError(t('ai.errorAnalysis'));
      }
    } catch (err) {
      console.error('Analysis error:', err);
      setError(t('ai.errorAnalysis'));
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setCustomerText(text);
    } catch (err) {
      console.error('Paste error:', err);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg mb-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-blue-500" />
        {t('ai.title')}
      </h3>
      <div className="space-y-4">
        <div className="relative">
          <textarea
            value={customerText}
            onChange={(e) => setCustomerText(e.target.value)}
            className="w-full h-40 p-3 border rounded-lg resize-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder={t('ai.placeholder')}
            dir="auto"
          />
          <button
            onClick={handlePaste}
            className="absolute top-2 left-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 bg-white dark:bg-gray-700 rounded-lg shadow-sm"
            title={t('ai.paste')}
          >
            <Clipboard className="w-5 h-5" />
          </button>
        </div>
        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}
        <button
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
        >
          <Sparkles className="w-5 h-5" />
          {isAnalyzing ? t('ai.analyzing') : t('ai.analyze')}
        </button>
      </div>
    </div>
  );
};

export default AIAssistant;