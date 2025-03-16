import React from 'react';
import { useTranslation } from 'react-i18next';

interface AmountFieldProps {
  value: string;
  hasCost: boolean;
  onChange: (value: string) => void;
  onToggleCost: () => void;
  labelColor: string;
}

const AmountField: React.FC<AmountFieldProps> = ({
  value,
  hasCost,
  onChange,
  onToggleCost,
  labelColor
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
      <label 
        className="shrink-0 px-4 py-2 font-bold text-base flex items-center gap-2"
        style={{ color: labelColor }}
      >
        {t('bill.amount')}:
        <button
          onClick={onToggleCost}
          className="text-sm px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 print:hidden"
        >
          {hasCost ? t('bill.noCost') : t('bill.amount')}
        </button>
      </label>
      <div className="flex-1 px-3 py-2">
        {hasCost ? (
          <input 
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent border-none focus:ring-0 text-lg text-center"
          />
        ) : (
          <span className="block text-gray-600 dark:text-gray-300 print:text-gray-800 text-lg text-center">
            {t('bill.noCost')}
          </span>
        )}
      </div>
    </div>
  );
};

export default AmountField;
