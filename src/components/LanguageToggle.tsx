import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
  language: 'ar' | 'en';
  onChange: (lang: 'ar' | 'en') => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, onChange }) => {
  const { t } = useTranslation();

  return (
    <button
      onClick={() => onChange(language === 'ar' ? 'en' : 'ar')}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      {t(`settings.language.${language === 'ar' ? 'en' : 'ar'}`)}
    </button>
  );
};

export default LanguageToggle;