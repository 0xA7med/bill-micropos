import React, { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ShippingBill from './components/ShippingBill';
import Settings from './components/Settings';
import PrintStyles from './components/PrintStyles';
import { SettingsState, defaultSettings } from './types/settings';
import './i18n';

const App: React.FC = () => {
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState<SettingsState>(defaultSettings);
  const { i18n } = useTranslation();
  const [bills, setBills] = useState([{ id: 1 }]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
    document.documentElement.dir = settings.language === 'ar' ? 'rtl' : 'ltr';
    i18n.changeLanguage(settings.language);
  }, [settings.theme, settings.language]);

  const handleSaveSettings = (newSettings: SettingsState) => {
    setSettings(newSettings);
    setShowSettings(false);
  };

  const toggleTheme = () => {
    const newTheme = settings.theme === 'light' ? 'dark' : 'light';
    setSettings(prev => ({ ...prev, theme: newTheme }));
  };

  const toggleLanguage = () => {
    const newLang = settings.language === 'ar' ? 'en' : 'ar';
    setSettings(prev => ({ ...prev, language: newLang }));
  };

  const handleAddBill = () => {
    setBills(prev => [...prev, { id: prev.length + 1 }]);
  };

  const handlePrint = () => {
    window.print();
  };

  console.log("Environment variables:", {
    API_KEY: import.meta.env.VITE_API_KEY,
    BACKUP_API_KEY: import.meta.env.VITE_BACKUP_API_KEY
  });
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <PrintStyles settings={settings} />
      <div className="max-w-7xl mx-auto">
        {showSettings ? (
          <Settings 
            settings={settings} 
            onSave={handleSaveSettings} 
            onBack={() => setShowSettings(false)}
          />
        ) : (
          <div className="space-y-8">
            <div className="fixed top-0 right-0 z-50 print:hidden">
              <div className="flex gap-2 bg-white dark:bg-gray-800 p-4 shadow-lg rounded-bl-lg">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
                  title={showSettings ? "Close Settings" : "Open Settings"}
                >
                  <SettingsIcon className="w-6 h-6" />
                </button>
                <button
                  onClick={toggleTheme}
                  className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors"
                >
                  {settings.theme === 'light' ? <Moon className="w-6 h-6" /> : <Sun className="w-6 h-6" />}
                </button>
                <button
                  onClick={toggleLanguage}
                  className="p-2 bg-white dark:bg-gray-800 rounded-lg shadow hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition-colors font-bold"
                >
                  {settings.language === 'ar' ? 'EN' : 'عربي'}
                </button>
              </div>
            </div>

            <div className="bills-container mt-20">
              {bills.map((bill) => (
                <div key={bill.id}>
                  <ShippingBill settings={settings} />
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-4 print:hidden">
              <button
                onClick={handleAddBill}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {i18n.t('bill.addAnother')}
              </button>
              <button
                onClick={handlePrint}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                {i18n.t('bill.print')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;