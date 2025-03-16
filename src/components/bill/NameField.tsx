import React from 'react';
import { useTranslation } from 'react-i18next';

interface NameFieldProps {
  value: string;
  onChange: (value: string) => void;
  labelColor: string;
}

const NameField: React.FC<NameFieldProps> = ({ value, onChange, labelColor }) => {
  const { t } = useTranslation();

  return (
    <div className="customer-name flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
      <label 
        className="shrink-0 px-4 py-2 font-bold text-base"
        style={{ color: labelColor }}
      >
        {t('bill.name')}:
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 px-3 py-2 bg-transparent border-none focus:ring-0 text-lg"
      />
    </div>
  );
};

export default NameField;
